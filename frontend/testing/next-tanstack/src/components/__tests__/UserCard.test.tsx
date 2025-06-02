import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import type { User } from "@/types/user";

import { UserCard } from "@/components/UserCard";

describe("UserCard Component", () => {
	const mockUser: User = {
		_id: "507f1f77bcf86cd799439011",
		name: "john doe",
		email: "john.doe@example.com",
		createdAt: new Date("2023-01-15T10:30:00Z"),
	};

	it("renders user information correctly", () => {
		render(<UserCard user={mockUser} />);

		expect(screen.getByText("John Doe")).toBeInTheDocument();
		expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
		expect(screen.getByText("507f1f77bcf86cd799439011")).toBeInTheDocument();
	});
});

// describe("UserCard Component", () => {
// 	const mockUser: User = {
// 		_id: "507f1f77bcf86cd799439011",
// 		name: "john doe",
// 		email: "john.doe@example.com",
// 		createdAt: new Date("2023-01-15T10:30:00Z"),
// 	};

// 	it("renders user information correctly", () => {
// 		render(<UserCard user={mockUser} />);

// 		expect(screen.getByText("John Doe")).toBeInTheDocument();
// 		expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
// 		expect(screen.getByText("507f1f77bcf86cd799439011")).toBeInTheDocument();
// 	});

// 	it("capitalizes user name correctly", () => {
// 		const userWithLowercase: User = {
// 			...mockUser,
// 			name: "jane smith",
// 		};

// 		render(<UserCard user={userWithLowercase} />);
// 		expect(screen.getByText("Jane Smith")).toBeInTheDocument();
// 	});

// 	it("displays formatted creation date in Portuguese", () => {
// 		render(<UserCard user={mockUser} />);

// 		expect(screen.getByText("15 de janeiro de 2023")).toBeInTheDocument();
// 	});

// 	it("handles user without _id", () => {
// 		const userWithoutId: User = {
// 			name: "John Doe",
// 			email: "john.doe@example.com",
// 		};

// 		render(<UserCard user={userWithoutId} />);

// 		expect(screen.getByText("John Doe")).toBeInTheDocument();
// 		expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
// 		expect(screen.queryByText("ID:")).not.toBeInTheDocument();
// 	});

// 	it("handles user without createdAt", () => {
// 		const userWithoutCreatedAt: User = {
// 			_id: "507f1f77bcf86cd799439011",
// 			name: "John Doe",
// 			email: "john.doe@example.com",
// 		};

// 		render(<UserCard user={userWithoutCreatedAt} />);

// 		expect(screen.getByText("John Doe")).toBeInTheDocument();
// 		expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
// 		expect(screen.queryByText("Created:")).not.toBeInTheDocument();
// 	});

// 	it("applies custom className", () => {
// 		const { container } = render(
// 			<UserCard user={mockUser} className="custom-class" />,
// 		);

// 		expect(container.firstChild).toHaveClass("custom-class");
// 	});

// 	it("passes through additional HTML attributes", () => {
// 		render(<UserCard user={mockUser} data-testid="user-card-test" />);

// 		expect(screen.getByTestId("user-card-test")).toBeInTheDocument();
// 	});

// 	it("displays all sections when user has complete information", () => {
// 		render(<UserCard user={mockUser} />);

// 		expect(screen.getByText("Email:")).toBeInTheDocument();
// 		expect(screen.getByText("ID:")).toBeInTheDocument();
// 		expect(screen.getByText("Created:")).toBeInTheDocument();
// 	});

// 	it("handles very long user names correctly", () => {
// 		const userWithLongName: User = {
// 			...mockUser,
// 			name: "very long name that might overflow the container element",
// 		};

// 		render(<UserCard user={userWithLongName} />);

// 		expect(
// 			screen.getByText(
// 				"Very Long Name That Might Overflow The Container Element",
// 			),
// 		).toBeInTheDocument();
// 	});

// 	it("handles special characters in user name", () => {
// 		const userWithSpecialChars: User = {
// 			...mockUser,
// 			name: "o'connor-smith",
// 		};

// 		render(<UserCard user={userWithSpecialChars} />);

// 		expect(screen.getByText("O'connor-smith")).toBeInTheDocument();
// 	});
// });
