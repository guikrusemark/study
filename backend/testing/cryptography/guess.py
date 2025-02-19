import bcrypt
import getpass
import itertools

def generate_numeric_passwords(length: int):
    """Generate all possible numeric passwords of a given length."""
    digits = '0123456789'
    return [''.join(p) for p in itertools.product(digits, repeat=length)]

# Ask for a password
password = getpass.getpass("\nDigite a senha: ").encode('utf-8')

# Hash the password
hashed = bcrypt.hashpw(password, bcrypt.gensalt())

print(f"Senha encriptada: {hashed.decode('utf-8')}\n")

    
# Example usage
length = 3  # Change this to the desired length of numeric passwords
passwords = generate_numeric_passwords(length)
# print(passwords)

for guess in passwords:
    guess = guess.encode('utf-8')
    if bcrypt.checkpw(guess, hashed):
        print(f"A SENHA É {guess}")
        break
    else:
        print(guess, hashed)