import connection


@connection.connection_handler
def registration(cursor, username, password):
    query = """
    INSERT INTO users (username, password)
    VALUES (%(username)s, %(password)s)"""
    cursor.execute(query, {'username': username, 'password': password})


@connection.connection_handler
def is_username(cursor, username):
    query = """
    SELECT CASE WHEN
    EXISTS
    (SELECT * FROM users WHERE username = %(username)s)
    THEN
    'TRUE'
    ELSE
    'FALSE'
    END
    """
    cursor.execute(query, {'username': username})
    case = cursor.fetchone()['case']
    return case


@connection.connection_handler
def get_usernames(cursor):
    query = """
    SELECT username
    FROM users
    GROUP BY username;"""
    cursor.execute(query)
    usernames = [row["username"] for row in cursor.fetchall()]
    return usernames


@connection.connection_handler
def get_user_password(cursor, username):
    query = """
    SELECT password
    FROM users
    WHERE username = %(username)s;"""
    cursor.execute(query, {'username': username})
    hashed_password = cursor.fetchone()['password']
    return hashed_password


@connection.connection_handler
def get_user_id_by_user_name(cursor, username):
    query = """
    SELECT id
    FROM users
    WHERE username = %(username)s"""
    cursor.execute(query, {'username': username})
    return cursor.fetchone()
