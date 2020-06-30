from config import *
from modelo import FeiraLivre

@app.route("/")
def inicio():
    return 'Cadastro dos alimentos da feira. '+\
        '<a href="/listar_feira">listar alimentos</a>'

@app.route("/listar_feira")
def listar_feira():
    alimentos = db.session.query(FeiraLivre).all()
    alimentos_em_json = [ x.json() for x in alimentos]
    resposta = jsonify(alimentos_em_json)
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta

app.run(debug=True)
