from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)

# RDS configuration
RDS_HOST = "dbpractica2.cpc608sc6jg2.us-east-2.rds.amazonaws.com"
RDS_PORT = 3306
RDS_USER = "admin"
RDS_PASSWORD = "contra123456#"
RDS_DB = "DBPractica2"

# Connect to the RDS instance
def connect_to_rds():
    try:
        connection = pymysql.connect(
            host=RDS_HOST,
            port=RDS_PORT,
            user=RDS_USER,
            password=RDS_PASSWORD,
            database=RDS_DB,
            cursorclass=pymysql.cursors.DictCursor
        )
        print("Connected to RDS successfully!")
        return connection
    except Exception as e:
        print(f"Error connecting to RDS: {e}")
        return None

# Example usage
@app.route('/test-connection', methods=['GET'])
def test_connection():
    connection = connect_to_rds()
    if connection:
        connection.close()
        return jsonify({"message": "Connection to RDS successful!"}), 200
    else:
        return jsonify({"message": "Failed to connect to RDS."}), 500
    
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    connection = connect_to_rds()
    if connection:
        with connection.cursor() as cursor:
            try: 
                sql = """INSERT INTO Usuario (nombre, username, password, email, foto_perfil)
                        VALUES (%s, %s, %s, %s, %s);"""
                cursor.execute(sql, (data['name'], data['username'], data['password'], data['email'], data['profilePicture']))
                connection.commit()
                # result = cursor.fetchall()
                return jsonify({"respuesta": 1, "message": "Register successful"}), 201
            except pymysql.err.IntegrityError as e:
                print("IntegrityError:", e)
                return jsonify({"error": "Username or email already exists."}), 409
            except Exception as e:
                print("Error:", e)
                return jsonify({"error": "An error occurred while registering."}), 500
    else:
        return jsonify({"message": "Failed to connect to RDS."}), 500
    
@app.route('/login', methods=['POST'])
def login():
    credentials = request.get_json()
    username = credentials.get("username")
    password = credentials.get("password")

    connection = connect_to_rds()
    if connection:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM Usuario WHERE username=%s AND password=%s;"
            cursor.execute(sql, (username, password))
            user = cursor.fetchone()
            print("User Data:", user)
            if user:
                return jsonify({"respuesta": 1, "message": "Login successful", "user": user, "status": 201}), 201
            else:
                return jsonify({"error": "Invalid username or password"}), 401
    else:
        return jsonify({"message": "Failed to connect to RDS."}), 500
    
@app.route('/tasks/<int:user_id>', methods=['GET'])
def get_tasks(user_id):
    print("User ID:", user_id)
    connection = connect_to_rds()
    if connection:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM Tarea WHERE id_usuario=%s;"
            cursor.execute(sql, (user_id,))
            tasks = cursor.fetchall()
            return jsonify(tasks), 200
    else:
        return jsonify({"message": "Failed to connect to RDS."}), 500
    
@app.route('/tasks/create', methods=['POST'])
def create_task():
    new_task = request.get_json()
    print("New Task Data:", new_task)
    connection = connect_to_rds()
    if connection:
        with connection.cursor() as cursor:
            sql = """INSERT INTO Tarea (id_usuario, titulo, descripcion, fecha_creacion)
                    VALUES (%s, %s, %s, %s);"""
            cursor.execute(sql, (new_task['id_usuario'], new_task['nombre'], new_task['descripcion'], new_task['fecha']))
            connection.commit()
    print("New Task:", new_task)
    return jsonify({"message": "Task created successfully.", "task": new_task, "status": 201}), 201

@app.route('/tasks/edit/<int:task_id>', methods=['PUT'])
def edit_task(task_id):
    task_data = request.get_json()
    print("Task Data:", task_data)

    connection = connect_to_rds()
    if connection:
        with connection.cursor() as cursor:
            sql = """UPDATE Tarea 
                    SET titulo=%s, descripcion=%s
                    WHERE id=%s;"""
            cursor.execute(sql, (task_data['nombre'], task_data['descripcion'], task_id))
            connection.commit()
    else:
        return jsonify({"message": "Failed to connect to RDS."}), 500
    return jsonify({"message": f"Task {task_id} updated successfully."})

@app.route('/tasks/<int:task_id>/complete', methods=['PUT'])
def complete_task(task_id):
    connection = connect_to_rds()
    if connection:
        with connection.cursor() as cursor:
            sql = "UPDATE Tarea SET estado='Terminada' WHERE id=%s;"
            cursor.execute(sql, (task_id,))
            connection.commit()
    else:
        return jsonify({"message": "Failed to connect to RDS."}), 500
    return jsonify({"message": f"Task {task_id} marked as complete."})

@app.route('/tasks/delete/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    connection = connect_to_rds()
    if connection:
        with connection.cursor() as cursor:
            sql = "DELETE FROM Tarea WHERE id=%s;"
            cursor.execute(sql, (task_id,))
            connection.commit()
    else:
        return jsonify({"message": "Failed to connect to RDS."}), 500
    return jsonify({"message": f"Task {task_id} deleted successfully."})

@app.route('/files/<int:user_id>', methods=['GET'])
def get_files(user_id):
    connection = connect_to_rds()
    if connection:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM Archivo WHERE id_usuario=%s;"
            cursor.execute(sql, (user_id,))
            files = cursor.fetchall()
            return jsonify(files), 200
    else:
        return jsonify({"message": "Failed to connect to RDS."}), 500
    
@app.route('/files/uploadFiles/<int:user_id>', methods=['POST'])
def upload_file(user_id):
    file_data = request.get_json()

    connection = connect_to_rds()
    if connection:
        with connection.cursor() as cursor:
            sql = """INSERT INTO Archivo (nombre, id_usuario, url, tipo)
                    VALUES (%s, %s, %s, %s);"""
            cursor.execute(sql, (file_data['name'], user_id, file_data['url'], file_data['tipo']))
            connection.commit()
    else:
        return jsonify({"message": "Failed to connect to RDS."}), 500
    return jsonify({"message": "File uploaded successfully."})
    
if __name__ == '__main__':
    app.run(debug=False, port=3000, host='0.0.0.0')
