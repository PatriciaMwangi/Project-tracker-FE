from app import db

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
