import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { type Student } from "../types/student";
import CreateStudentModal from "../components/student-modal";
import StudentCard from "../components/student-card";

export function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [showModal, setShowModal] = useState(false);

  async function fetchStudents() {
    try {
      const res = await fetch("http://localhost:3333/students");

      if (!res.ok) {
        const json = await res.json();
        throw json;
      }

      const body = await res.json();
      setStudents(body);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Container style={{ marginTop: "40px" }}>
      <Row>
        <Col>
          <h1>Estudantes</h1>
        </Col>
        <Col className="text-end">
          <Button id="create-new-student" size="sm" onClick={() => setShowModal(true)}>
            Adicionar estudante
          </Button>
        </Col>
      </Row>
      <div className="students__list" style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {students.length > 0 ? students.map((student) => <StudentCard key={student.registration} student={student} onStudentDeleted={fetchStudents} />) : <span>Nenhum estudante cadastrado.</span>}
      </div>
      <CreateStudentModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
        onStudentSaved={fetchStudents}
      />
    </Container>
  );
}
