
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(50)
);


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(50),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE user_has_patient (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    id_patient INT,
	FOREIGN KEY (id_user) REFERENCES users(id),
	FOREIGN KEY (id_patient) REFERENCES users(id)
);

CREATE TABLE assessments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name varchar(50)
);


CREATE TABLE patient_assessments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    description varchar(150),
    image blob,
    creation_date   DATETIME DEFAULT   CURRENT_TIMESTAMP,
    id_patient INT,
    id_assessment INT,
    FOREIGN KEY (id_patient) REFERENCES users(id),
    FOREIGN KEY (id_assessment) REFERENCES assessments(id)
);



INSERT INTO roles (  name ) values ( 'patient' ), ('user' );
INSERT INTO users  ( role_id, name ) values ( 1,'Sr Vollmer' ),( 1,'Sr Hinz' ),( 1,'Ms Nibengagen' ), (2,'Dr Schmitt' ), (2,'Dr Swinner' );
INSERT INTO assessments (  name ) values ( 'skin health' ), ('flare-up' );
INSERT INTO patient_assessments (  description,image,id_patient,id_assessment,creation_date  ) 
values ('Patient 1 - skin health','xxxx',1,1,'2022-01-17'), ('Patient 1 - skin health','xxxx',1,1,'2022-01-18'),('Patient 1 - skin health','xxxx',1,2,'2022-01-23'),
       ('Patient 2 - skin health','xxxx',2,1,'2022-01-20'), ('Patient 2 - skin health','xxxx',2,1,'2022-01-22'),('Patient 2 - skin health','xxxx',2,2,'2022-01-27');
INSERT INTO user_has_patient  ( id_user, id_patient  ) values ( 4,1 ),(4,2 ),( 4,3 ),(5,1 );



select * from patient_assessments a
join users b 
on a.id_patient  =b.id 
where a.id_patient in 
   (select id_patient from user_has_patient up 
	join users u on up.id_user=u.id 
	where u.name='Dr Swinner')



SELECT * FROM patient_assessments
WHERE creation_date  >= curdate() - INTERVAL DAYOFWEEK(curdate())+6 DAY
AND creation_date < curdate() - INTERVAL DAYOFWEEK(curdate())-1 day
order by creation_date 





