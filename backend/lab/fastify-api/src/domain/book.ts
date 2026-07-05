// A branded type makes `BookId` stricter than a normal number.
// At runtime it is still just a number, but TypeScript will not let you pass
// any random number to functions that ask for a `BookId`.
declare const bookIdBrand: unique symbol;

export type BookId = number & { readonly [bookIdBrand]: "BookId" };

// DTO means "Data Transfer Object".
// This is the plain JSON shape returned by the API and stored by repositories.
// It has no methods, only data.
export type BookDto = Readonly<{
  id: number;
  title: string;
  author: string;
  year?: number;
}>;

// Input accepted when a client creates a book.
// Notice there is no `id`: the repository generates it.
export type CreateBookInput = Readonly<{
  title: string;
  author: string;
  year?: number;
}>;

// PATCH updates are partial, so every create field becomes optional.
export type UpdateBookInput = Readonly<Partial<CreateBookInput>>;

// Query options for listing books.
// Keeping this as a type makes the service independent from Fastify.
export type BookListFilter = Readonly<{
  author?: string;
}>;

// Internal state for the Book class.
// It uses `BookId`, not number, so domain objects are stricter than raw HTTP.
type BookProps = Readonly<{
  id: BookId;
  title: string;
  author: string;
  year?: number;
}>;

// Converts and validates a plain number into a domain `BookId`.
// This is a good place to reject invalid ids before they reach the service.
export function toBookId(value: number): BookId {
  if (!Number.isInteger(value) || value <= 0) {
    throw new RangeError("Book id must be a positive integer");
  }

  return value as BookId;
}

// `Book` is an entity class.
// In OOP terms, it owns behavior related to one book:
// create, restore from storage, update, match author, and convert back to DTO.
export class Book {
  // The constructor is private so callers must use `create` or `restore`.
  // That gives the class one controlled place for object creation.
  private constructor(private readonly props: BookProps) {}

  // Use `create` for new books coming from user input.
  // It trims strings before storing them in the domain object.
  static create(id: BookId, input: CreateBookInput): Book {
    return new Book(
      withOptionalYear(
        {
          id,
          title: input.title.trim(),
          author: input.author.trim(),
        },
        input.year,
      ),
    );
  }

  // Use `restore` when rebuilding an existing book from storage or seed data.
  // It trusts already-stored title/author values and validates only the id.
  static restore(dto: BookDto): Book {
    return new Book(
      withOptionalYear(
        {
          id: toBookId(dto.id),
          title: dto.title,
          author: dto.author,
        },
        dto.year,
      ),
    );
  }

  // A getter exposes the id without exposing the whole private `props` object.
  get id(): BookId {
    return this.props.id;
  }

  // Immutable update example:
  // this method does not mutate the current object. It returns a new `Book`
  // instance with the changed fields.
  update(input: UpdateBookInput): Book {
    // `"year" in input` lets clients explicitly send `{ "year": undefined }`
    // in TypeScript code. For JSON clients, omitted fields are the common case.
    const nextYear = "year" in input ? input.year : this.props.year;

    return new Book(
      withOptionalYear(
        {
          id: this.props.id,
          title: input.title?.trim() ?? this.props.title,
          author: input.author?.trim() ?? this.props.author,
        },
        nextYear,
      ),
    );
  }

  // Domain behavior lives near the data it uses.
  // The repository calls this instead of duplicating author-match logic.
  matchesAuthor(author: string): boolean {
    return this.props.author.toLowerCase().includes(author.toLowerCase());
  }

  // Convert the class instance back to plain JSON data.
  // Route handlers should return DTOs, not class instances.
  toDto(): BookDto {
    return withOptionalYear(
      {
        id: this.props.id,
        title: this.props.title,
        author: this.props.author,
      },
      this.props.year,
    );
  }
}

// With `exactOptionalPropertyTypes`, `{ year: undefined }` is different from
// omitting `year`. This helper omits the property when there is no year.
function withOptionalYear<T extends object>(
  value: T,
  year: number | undefined,
): T & { year?: number } {
  return year === undefined ? value : { ...value, year };
}
