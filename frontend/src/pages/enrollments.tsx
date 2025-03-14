import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";

interface Student {
  _id: string;
  name: string;
  birthdate: string;
  address: string;
  registration: string;
}

interface Course {
  _id: string;
  name: string;
  code: string;
  description: string;
}

export function Enrollments() {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchStudents() {
    try {
      const res = await fetch("http://localhost:3333/students");
      if (!res.ok) {
        throw new Error("Erro ao buscar estudantes");
      }
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    }
  }

  async function fetchCourses() {
    try {
      const res = await fetch("http://localhost:3333/courses");
      if (!res.ok) {
        throw new Error("Erro ao buscar cursos");
      }
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    }
  }

  async function fetchEnrollments(studentId: string) {
    try {
      const res = await fetch(`http://localhost:3333/students/${studentId}/courses`);
      if (!res.ok) {
        throw new Error("Erro ao buscar disciplinas matriculadas");
      }
      const data = await res.json();
      setEnrolledCourses(data);
    } catch (err) {
      console.error(err);
      setError((err as Error).message);
    }
  }

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedStudentId) {
      fetchEnrollments(selectedStudentId);
    } else {
      setEnrolledCourses([]);
    }
  }, [selectedStudentId]);

  const enrollCourse = async () => {
    if (!selectedStudentId || !selectedCourseId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3333/students/${selectedStudentId}/courses`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: selectedCourseId }),
      });
      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Erro ao matricular disciplina");
      }
      await fetchEnrollments(selectedStudentId);
      setSelectedCourseId("");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const removeEnrollment = async (courseId: string) => {
    if (!selectedStudentId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:3333/students/${selectedStudentId}/courses/${courseId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg || "Erro ao remover matrícula");
      }
      await fetchEnrollments(selectedStudentId);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const availableCourses = courses.filter((course) => !enrolledCourses.some((enrolled) => enrolled._id === course._id));

  return (
    <Container style={{ marginTop: "40px" }}>
      <Row className="mb-3">
        <Col>
          <h1>Matrículas</h1>
        </Col>
      </Row>
      {error && <div className="alert alert-danger">{error}</div>}
      <Row className="mb-3">
        <Col md={6}>
          <Form.Group controlId="selectStudent">
            <Form.Label>Selecione o estudante</Form.Label>
            <Form.Control as="select" value={selectedStudentId} onChange={(e) => setSelectedStudentId(e.target.value)}>
              <option value="">-- Selecione --</option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name} ({student.registration})
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      {selectedStudentId && (
        <>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="selectCourse">
                <Form.Label>Adicionar disciplina</Form.Label>
                <Form.Control as="select" value={selectedCourseId} onChange={(e) => setSelectedCourseId(e.target.value)}>
                  <option value="">-- Selecione --</option>
                  {availableCourses.map((course) => (
                    <option key={course._id} value={course._id}>
                      {course.name} ({course.code})
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-end">
              <Button variant="primary" onClick={enrollCourse} disabled={loading || !selectedCourseId}>
                Matricular
              </Button>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <h4>Disciplinas Matriculadas</h4>
              {enrolledCourses.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Código</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrolledCourses.map((course) => (
                      <tr key={course._id}>
                        <td>{course.name}</td>
                        <td>{course.code}</td>
                        <td>
                          <Button variant="danger" size="sm" onClick={() => removeEnrollment(course._id)}>
                            Remover
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>Este estudante não está matriculado em nenhuma disciplina.</p>
              )}
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}
