import React, { useState } from "react";
import { Card, ListGroup, Button } from "react-bootstrap";
import StudentModal from "./student-modal";
import { type Student } from "../types/student";

interface StudentCardProps {
  student: Student;
  onStudentDeleted?: (studentId: string) => void;
  onStudentUpdated?: (updatedStudent: Student) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onStudentDeleted, onStudentUpdated }) => {
  const formattedBirthdate = new Date(student.birthdate).toLocaleDateString();
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:3333/students/${student._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      if (onStudentDeleted && student._id) {
        onStudentDeleted(student._id);
      }
    } catch (error) {
      setDeleteError((error as Error).message || "Failed to delete student.");
    }
  };

  const handleStudentSaved = (updatedStudent: Student) => {
    if (onStudentUpdated) {
      onStudentUpdated(updatedStudent);
    }
  };

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>{student.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Matrícula: {student.registration}</Card.Subtitle>
          <Card.Text>
            <strong>Data de nascimento:</strong> {formattedBirthdate}
            <br />
            <strong>Endereço:</strong> {student.address}
          </Card.Text>
          {deleteError && <div className="alert alert-danger">{deleteError}</div>}
          <div className="d-flex">
            <Button variant="primary" className="me-2" onClick={() => setShowEditModal(true)}>
              Editar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Remover
            </Button>
          </div>
        </Card.Body>
        {student.courses && student.courses.length > 0 && (
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Cursos:</strong> {student.courses.join(", ")}
            </ListGroup.Item>
          </ListGroup>
        )}
      </Card>

      {showEditModal && <StudentModal show={showEditModal} onHide={() => setShowEditModal(false)} onStudentSaved={handleStudentSaved} student={student} />}
    </>
  );
};

export default StudentCard;
