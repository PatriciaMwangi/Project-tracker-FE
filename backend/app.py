from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/project_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    description = db.Column(db.String(500))
    github_link = db.Column(db.String(200))
    contributors = db.Column(db.String(200))
    admin = db.Column(db.String(100))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'github_link': self.github_link,
            'contributors': self.contributors,
            'admin': self.admin
        }

@app.route('/projects', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return jsonify([project.to_dict() for project in projects])

@app.route('/projects', methods=['POST'])
def add_project():
    data = request.get_json()
    new_project = Project(
        name=data['name'],
        description=data['description'],
        github_link=data['github_link'],
        contributors=data['contributors'],
        admin=data['admin']
    )
    db.session.add(new_project)
    db.session.commit()
    return jsonify(new_project.to_dict()), 201

@app.route('/projects/<int:id>', methods=['GET'])
def get_project(id):
    project = Project.query.get_or_404(id)
    return jsonify(project.to_dict())

if __name__ == '__main__':
    app.run(debug=True)
