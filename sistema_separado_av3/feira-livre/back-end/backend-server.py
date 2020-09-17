from config import *
from models import FeiraLivre

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

if __name__ == '__main__':
    app.run(debug=True)