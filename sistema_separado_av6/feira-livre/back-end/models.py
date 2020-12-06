from config import *
import os

class FeiraLivre(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome_alimento = db.Column(db.String(254))
    preco_por_kilo = db.Column(db.Float(254))
    safra = db.Column(db.String(254))

    def __str__(self):
        return f'''
                - id: ({self.id}) 
                - nome_alimento: {self.nome_alimento} 
                - preco_por_kilo: {self.preco_por_kilo} 
                - safra: {self.safra}
                '''
    
    def json(self):
        return ({
            "id": self.id,
            "nome_alimento": self.nome_alimento,
            "preco_por_kilo": self.preco_por_kilo,
            "safra": self.safra
        })

class Descartadora(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))

    alimento_id = db.Column(db.Integer, db.ForeignKey(FeiraLivre.id))
    feiralivre = db.relationship("FeiraLivre")

    def __str__(self): # expressão da classe em forma de texto
        return  self.nome + ", "  + \
            str(self.feiralivre) # o str aciona o __str__ da classe Pessoa

    def json(self):
        return {
            "id":self.id,
            "nome":self.nome,
            "alimento_id":self.alimento_id,
            "feiralivre":self.feiralivre.json() 
        }

class Fornecedora(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(254))
    local = db.Column(db.String(254))


    alimento_id = db.Column(db.Integer, db.ForeignKey(FeiraLivre.id))
    feiralivre = db.relationship("FeiraLivre")


    def __str__(self): # expressão da classe em forma de texto
        return f"Empresa {self.nome} seu ID é {self.id}"

    def json(self):
        return {
            "id": self.id,
            "nome": self.nome,
            "local": self.local,
            "alimento_id": self.alimento_id,
            "feiralivre": self.feiralivre.json(),
        } 

# Testes
if __name__ == "__main__":
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    db.create_all()

    p1 = FeiraLivre(nome_alimento = "Abacate", 
        preco_por_kilo = 10.20, 
        safra = "Junho")
    p2 = FeiraLivre(nome_alimento = "Pera", 
        preco_por_kilo = 19.50, 
        safra = "Março")     
    p3 = FeiraLivre(nome_alimento = "Acerola", 
        preco_por_kilo = 15, 
        safra = "Abril")    
    p4 = FeiraLivre(nome_alimento = "Goiaba", 
        preco_por_kilo = 23.40, 
        safra = "Agosto")    
    p5 = FeiraLivre(nome_alimento = "Melancia", 
        preco_por_kilo = 17.34, 
        safra = "Dezembro")    

    db.session.add(p1)
    db.session.add(p2)
    db.session.add(p3)
    db.session.add(p4)
    db.session.add(p5)
    
    db.session.commit()

    
    d1 = Descartadora(nome = "Trash Life",feiralivre = p1)
    db.session.add(d1)
    db.session.commit()

    f1 = Fornecedora(nome = "Alimentos Da Terra", local = "Blumenau", feiralivre = p2)
    db.session.add(f1)
    db.session.commit()

    print(f1)

    """print("* * * * * * * * * * * * * * * * * * * * * * ")
    print("*")
    print("*",p1,"----",p2,"----",p3,"----",p4,"----",p5)
    print("*------------------------------------------")
    print("*",p2.json())
    print("*")
    print("*")
    print("* * * * * * * * * * * * * * * * * * * * * * ")

    print(d1.json())

    print(o1)


print("")
print(f1)
print(f1.json())
print("")
print("* * * * * * * * * * * * * * * * * * * * * * ")
print("")
print(d1)
print(d1.json())
print("")
print(f1.feiralivre.nome_alimento)

"""