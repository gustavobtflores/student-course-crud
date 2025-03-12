import { useEffect, useState } from "react";

interface Course {
  _id: string;
  name: string;
  description: string;
}

interface Student {
  name: string;
  email: string;
  birthdate: string;
  registration: string;
  courses: Course[];
}

export function Student() {
  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }

        const res = await fetch("http://localhost:3333/students/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          const json = await res.json();
          throw json;
        }

        const body = await res.json();
        setStudent(body);
      } catch (err) {
        console.log(err);
      }
    }

    fetchStudent();
  }, []);

  if (!student) {
    return null;
  }

  function removeCourse(id: string) {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    fetch(`http://localhost:3333/students/courses/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setStudent(data);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="student">
      <div className="student__wrapper">
        <div className="student__info">
          <p>
            <strong>Nome:</strong> {student.name}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          <p>
            <strong>Data de Nascimento:</strong> {new Date(student.birthdate).toLocaleDateString()}
          </p>
        </div>
        <div className="student__courses">
          <h2>Cursos matriculados</h2>
          {student.courses.length === 0 ? (
            <div>
              <span>Nenhum curso matriculado</span>
            </div>
          ) : (
            <ul>
              {student.courses && student.courses.length > 0 ? (
                <ul>
                  {student.courses.map((course) => (
                    <li key={course._id}>
                      <h3>{course.name}</h3>
                      <p>{course.description || "Sem descrição"}</p>
                      <button onClick={() => removeCourse(course._id)}>Remover</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Você não está matriculado em nenhuma disciplina.</p>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
