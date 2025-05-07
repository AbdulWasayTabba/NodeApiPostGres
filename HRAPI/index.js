const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        res.json('Welcome to HR api ')
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}
);

app.get('/region', async (req, res) => {
    try {
        const result = await pool.query('select * from regions');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}
);

app.get('/countries', async (req, res) => {
    try {
        const result = await pool.query('select * from countries');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}
);

app.get('/employee', async (req, res) => {
    try {
        const result = await pool.query('select * from employees');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}
);

app.get('/job', async (req, res) => {
    try {
        const result = await pool.query('select * from jobs');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}
);

app.get('/department', async (req, res) => {
    try {
        const result = await pool.query('select * from departments');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}
);

app.get('/location', async (req, res) => {
    try {
        const result = await pool.query('select * from locations');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}
);

app.get('/job_history', async (req, res) => {
    try {
        const result = await pool.query('select * from job_history');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}
);


app.get('/employees', async (req, res) => {
    try {
        const result = await pool.query('select count(employee_id) from employees');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}
);

app.get('/totalcrty', async (req, res) => {
    try {
        const result = await pool.query('select count(country_id) from countries');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}
);

app.get('/totalloc', async (req, res) => {
    try {
        const result = await pool.query('select count(location_id) from locations');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}
);

app.get('/totaldepartment', async (req, res) => {
    try {
        const result = await pool.query('select count(department_id) from departments');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}
);

app.get('/totaljob', async (req, res) => {
    try {
        const result = await pool.query('select count(job_id) from jobs');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}
);
app.get('/totalregion', async (req, res) => {
    try {
        const result = await pool.query('select count(region_id) from regions');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ Error: err.message })
    }
}
);




app.get('/query50', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT j.*, e.first_name, jj.job_title, c.country_name
            FROM job_history j
            JOIN employees e ON j.employee_id = e.employee_id
            JOIN jobs jj ON jj.job_id = j.job_id
            JOIN departments d ON e.department_id = d.department_id
            JOIN locations l ON d.location_id = l.location_id
            JOIN countries c ON l.country_id = c.country_id
            LIMIT 3
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Query Error:', err); 
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query51', async (req, res) => {
    try {
        const result = await pool.query(`
           select r.*,c.country_name,l.street_address from regions r join countries c on
c.region_id=r.region_id join locations l on l.country_id=c.country_id limit 3
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Query Error:', err); 
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query52', async (req, res) => {
    try {
        const result = await pool.query(`select r.*,c.country_name,l.street_address from regions r left outer join countries c on c.region_id=r.region_id join locations l on l.country_id=c.country_id limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query53', async (req, res) => {
    try {
        const result = await pool.query(`select r.*,c.country_name,l.street_address from locations l left outer join countries c on l.country_id=c.country_id join  regions r on c.region_id=r.region_id limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query54', async (req, res) => {
    try {
        const result = await pool.query(`select d.*,e.first_name , l.street_address from departments d left outer join employees e on d.department_id=e.department_id left outer join locations l on d.location_id=l.location_id limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query55', async (req, res) => {
    try {
        const result = await pool.query(`select d.*,e.first_name , l.street_address,c.country_name from departments d left outer join employees e on d.department_id=e.department_id left outer join locations l on d.location_id=l.location_id join countries c on l.country_id=c.country_id limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query56', async (req, res) => {
    try {
        const result = await pool.query(`select e.employee_id,concat(m.first_name,' ',m.last_name) as MANAGER_NAME,d.department_name from employees e left outer join employees m on e.employee_id=m.employee_id join departments d on e.department_id=d.department_id join locations l on d.location_id=l.location_id limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query57', async (req, res) => {
    try {
        const result = await pool.query(`select e.*,j.job_title,d.department_name,l.city from employees e join jobs j on e.job_id=j.job_id join departments d on e.department_id=d.department_id join locations l on d.location_id=l.location_id limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query58', async (req, res) => {
    try {
        const result = await pool.query(`select e.employee_id,concat(m.first_name,' ',m.last_name) as MANAGER_NAME,d.department_name,j.job_title from employees e left outer join employees m on e.employee_id=m.employee_id join departments d on e.department_id=d.department_id join jobs j on j.job_id=e.job_id limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query59', async (req, res) => {
    try {
        const result = await pool.query(`select e.employee_id,concat(m.first_name,' ',m.last_name) as MANAGER_NAME,d.department_name,l.street_address,j.job_title from employees e left outer join employees m on e.employee_id=m.employee_id join departments d on e.department_id=d.department_id join jobs j on j.job_id=e.job_id join locations l on d.location_id=l.location_id limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query60', async (req, res) => {
    try {
        const result = await pool.query(`select country_name from countries where region_id =1;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query61', async (req, res) => {
    try {
        const result = await pool.query(`select d.department_name from departments d join locations l on d.location_id =l.location_id where l.city like 'N%';`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query62', async (req, res) => {
    try {
        const result = await pool.query(`select e.* from employees e join departments d on e.department_id = d.department_id join employees m on d.manager_id = m.employee_id where m.commission_pct > .15 limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query63', async (req, res) => {
    try {
        const result = await pool.query(`select  j.job_title from employees e join jobs j on e.job_id=j.job_id where e.employee_id in (select manager_id from departments where manager_id is not null);`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query64', async (req, res) => {
    try {
        const result = await pool.query(`select l.postal_code from locations l join countries c on l.country_id =c.country_id join regions r on c.region_id = r.region_id where r.region_name = 'Asia';`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query65', async (req, res) => {
    try {
        const result = await pool.query(`select distinct d.department_name from employees e join departments d on e.department_id=d.department_id where e.commission_pct <(select avg(commission_pct) from employees);`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query66', async (req, res) => {
    try {
        const result = await pool.query(`select e.* ,j.job_title from employees e join jobs j on e.job_id=j.job_id where e.salary > (select avg(salary) from employees where department_id=e.department_id) limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query67', async (req, res) => {
    try {
        const result = await pool.query(`select employee_id from employees where department_id is NULL;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query68', async (req, res) => {
    try {
        const result = await pool.query(`select e.* from employees e join job_history j on e.employee_id=j.employee_id GROUP BY e.employee_id ,e.first_name , e.last_name having count (j.job_id)>1;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query69', async (req, res) => {
    try {
        const result = await pool.query(`select d.department_name , count(e.employee_id) as employee_count from employees e join departments d on e.department_id=d.department_id group by d.department_name;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query70', async (req, res) => {
    try {
        const result = await pool.query(`select j.job_title , sum(e.salary) as total_salary from employees e join jobs j on e.job_id=j.job_id group by j.job_title limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query71', async (req, res) => {
    try {
        const result = await pool.query(`select d.department_name , avg(e.commission_pct) as avg_commission from employees e join departments d on e.department_id = d.department_id group by d.department_id limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query72', async (req, res) => {
    try {
        const result = await pool.query(`select l.country_id,c.country_name , max ( e.salary) as max_salary from employees e join departments d on e.department_id=d.department_id join locations l on d.location_id = l.location_id join countries c on l.country_id = c.country_id group by l.country_id , c.country_name;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query73', async (req, res) => {
    try {
        const result = await pool.query(`select j.job_title,d.department_name,concat(e.first_name , ' ' , e.last_name) as FULL_NAME ,e.hire_date as START_DATE from employees e join jobs j on e.job_id=j.job_id join departments d on e.department_id =d.department_id where e.hire_date between '1993-01-01' and '1997-08-31' limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query74', async (req, res) => {
    try {
        const result = await pool.query(`select c.country_name , l.city,count(d.department_id) as number_of_Departments from employees e join departments d on e.department_id=d.department_id join locations l on d.location_id=l.location_id join countries c on l.country_id = c.country_id group by c.country_name , l.city having count (e.employee_id)>=2;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query75', async (req, res) => {
    try {
        const result = await pool.query(`select e.first_name || ' ' || e.last_name as FULL_NAME , j.job_title ,jh.start_date,jh.end_date from job_history jh join employees e on jh.employee_id=e.employee_id join jobs j on jh.job_id=j.job_id where e.commission_pct is NULL or e.commission_pct = 0 limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query76', async (req, res) => {
    try {
        const result = await pool.query(`select e.first_name || ' ' || e.last_name as FULL_NAME , c.country_name from employees e join departments d on e.department_id =d.department_id join locations l on d.location_id = l.location_id join countries c on l.country_id = c.country_id limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query77', async (req, res) => {
    try {
        const result = await pool.query(`select * from employees where salary in (select min(salary) from employees group by department_id) limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query78', async (req, res) => {
    try {
        const result = await pool.query(`select * from employees where salary = (select distinct salary from employees order by salary desc limit 1 offset 2);`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query79', async (req, res) => {
    try {
        const result = await pool.query(`select first_name || ' ' || last_name as FULL_NAME , salary from employees  where salary > (select avg (salary) from employees) and department_id in (select department_id from employees where first_name like '%J%' or last_name like '%J%') limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query80', async (req, res) => {
    try {
        const result = await pool.query(`select first_name || ' ' || last_name as FULL_NAME , e.employee_id,j.job_title from employees e join departments d on e.department_id=d.department_id join locations l on d.location_id = l.location_id join jobs j on e.job_id = j.job_id where l.city='Toronto';`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query81', async (req, res) => {
    try {
        const result = await pool.query(`SELECT department_id, SUM(salary) AS total_salary FROM employees GROUP BY department_id HAVING COUNT(*) > 0;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query82', async (req, res) => {
    try {
        const result = await pool.query(`SELECT employee_id, first_name, last_name, salary, CASE WHEN salary > (SELECT AVG(salary) FROM employees) THEN 'HIGH' ELSE 'LOW' END AS Salary_Status FROM employees limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query83', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.* FROM employees e JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id JOIN countries c ON l.country_id = c.country_id WHERE c.country_name = 'United Kingdom' limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query84', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.* FROM employees e JOIN (SELECT department_id, SUM(salary) AS dept_total_salary FROM employees GROUP BY department_id) dept_salary ON e.department_id = dept_salary.department_id WHERE e.salary > 0.5 * dept_salary.dept_total_salary limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query85', async (req, res) => {
    try {
        const result = await pool.query(`SELECT DISTINCT e.* FROM employees e JOIN employees m ON e.employee_id = m.manager_id limit 3;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query86', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.employee_id, e.first_name, e.last_name, e.salary, d.department_name, l.city FROM employees e JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id WHERE e.hire_date BETWEEN '2002-01-01' AND '2003-12-31' AND e.salary = (SELECT MAX(salary) FROM employees WHERE hire_date BETWEEN '2002-01-01' AND '2003-12-31');`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query87', async (req, res) => {
    try {
        const result = await pool.query(`SELECT e.first_name, e.last_name, e.salary, e.department_id FROM employees e WHERE e.salary < (SELECT AVG(salary) FROM employees) AND e.department_id = (SELECT department_id FROM employees WHERE first_name = 'Laura' LIMIT 1);`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query88', async (req, res) => {
    try {
        const result = await pool.query(`SELECT d.* FROM departments d WHERE d.department_id IN (SELECT e.department_id FROM employees e WHERE e.salary >= 7000 AND e.employee_id IN (SELECT employee_id FROM job_history));`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query89', async (req, res) => {
    try {
        const result = await pool.query(`SELECT r.region_name, MIN(LENGTH(l.postal_code)) AS min_postal_length FROM regions r JOIN countries c ON r.region_id = c.region_id JOIN locations l ON c.country_id = l.country_id GROUP BY r.region_name;`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ Error: err.message });
    }
});

app.get('/query90', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT * FROM employees ORDER BY hire_date DESC LIMIT 3;
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }});



 



const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Connected succesfully... on PORT ${PORT}`)
});