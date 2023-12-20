class CPF():
    def __init__(self, cpf):
        if self.valida(cpf):
            self.cpf = cpf
        else:
            raise ValueError("CPF inválido!")

    def __str__(self):
        return self.format()

    def valida(self, cpf):
        if len(cpf) == 11:
            return True
        else:
            return False

    def format(self):
        return "{}.{}.{}-{}".format(
            self.cpf[0:3], self.cpf[3:6], self.cpf[6:9], self.cpf[9:11]
        )
        
class CNPJ():
    def __init__(self, cnpj):
        if self.valida(cnpj):
            self.cnpj = cnpj
        else:
            raise ValueError("CNPJ inválido!")

    def __str__(self):
        return self.format()

    def valida(self, cnpj):
        if len(cnpj) == 14:
            return True
        else:
            return False

    def format(self):
        return "{}.{}.{}/{}-{}".format(
            self.cnpj[0:2], self.cnpj[2:5], self.cnpj[5:8], self.cnpj[8:12], \
                self.cnpj[12:14]
        )

class Cellphone():
    def __init__(self, cellphone):
        if self.valida(cellphone):
            self.cellphone = cellphone
        else:
            raise ValueError("Número de celular inválido!")

    def __str__(self):
        return self.format()

    def valida(self, cellphone):
        if len(cellphone) == 11:
            return True
        else:
            return False

    def format(self):
        return "({}) {}-{}".format(
            self.cellphone[0:2], self.cellphone[2:7], self.cellphone[7:11]
        )

class CEP():
    def __init__(self, cep):
        if self.valida(cep):
            self.cep = cep
        else:
            raise ValueError("CEP inválido!")

    def __str__(self):
        return self.format()

    def valida(self, cep):
        if len(cep) == 8:
            return True
        else:
            return False

    def format(self):
        return "{}-{}".format(
            self.cep[0:5], self.cep[5:8]
        )