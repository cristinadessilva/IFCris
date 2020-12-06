from config import *
from models import FeiraLivre, Descartadora, Fornecedora


@app.route('/itens_feira', methods=['get'])
def itens_feira():
    db_alimentos = db.session.query(FeiraLivre).all()
    json_alimentos = [ alimento.json() for alimento in db_alimentos ]
    response = jsonify(json_alimentos)
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/criar_alimento', methods=['post'])
def criar_alimento():
    response = jsonify({"status": "201", "result": "ok", "details": "Alimento criado!"})
    data = request.get_json()
    try:
        novo = FeiraLivre(**data)
        db.session.add(novo)
        db.session.commit()
    except Exception as e:
        response = jsonify({"status": "400", "result": "error", "details ": str(e)})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response 

@app.route('/deletar_alimentos/<int:id>', methods=['DELETE'] )
def deletar_alimentos(id):
    response = jsonify({"status": "200", "result": "ok", "details": "ok"})
    try:
        FeiraLivre.query.filter(FeiraLivre.id == id).delete()
        db.session.commit()
    except Exception as e:
        response = jsonify({"status": "400" , "result": "error", "details": str(e)})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response
    
@app.route("/listar_fornecedoras")
def listar_fornecedoras():
    fornecedoras = db.session.query(Fornecedora).all()
    lista_jsons = [ x.json() for x in fornecedoras ]
    resposta = jsonify(lista_jsons)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

@app.route("/listar_descartadoras")
def listar_descartadoras():
    descartadoras = db.session.query(Descartadora).all()
    lista_jsons = [ x.json() for x in descartadoras ]
    resposta = jsonify(lista_jsons)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

if __name__ == '__main__':
    app.run(debug=True)