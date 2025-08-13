import bcrypt
import getpass

# Ask for a password
password = getpass.getpass("\nDigite a senha: ").encode('utf-8')

# Hash the password
hashed = bcrypt.hashpw(password, bcrypt.gensalt())

print(f"Senha encriptada: {hashed}\n")

# Loop to guess the password
while True:
    guess = getpass.getpass("Adivinhe a senha: ").encode('utf-8')
    if bcrypt.checkpw(guess, hashed):
        print("ACERTOU MIZERAVI\n")
        break
    else:
        print("NADA A VER IRMAU.\n")