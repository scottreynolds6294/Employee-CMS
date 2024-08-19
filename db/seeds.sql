INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales');

INSERT INTO role (title, salary, department_id)
VALUES ('Lead Engineer', 150000, 1),
       ('Software Engineer', 120000, 1),
       ('Account Manager', 110000, 2),
       ('Accountant', 100000, 2),
       ('Legal Team Lead', 200000, 3),
       ('Lawyer', 160000, 3),
       ('Sales Lead', 125000, 4),
       ('Salesperson', 90000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Tom', 'Smith', 1, null),
       ('Sean', 'Thomas', 2, 1),
       ('Sarah', 'Jones', 3, null),
       ('Amy', 'Williams', 4, 3),
       ('Craig', 'Johnson', 5, null),
       ('Lisa', 'Phillips', 6, 5),
       ('Phyllis' 'Peters', 7, null),
       ('Chris', 'Adams', 8, 7);