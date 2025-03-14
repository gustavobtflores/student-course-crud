import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { type Student } from "../types/student";

interface StudentModalProps {
  show: boolean;
  onHide: () => void;
  onStudentSaved: (student: Student) => void;
  student?: Student;
}

const StudentModal: React.FC<StudentModalProps> = ({ show, onHide, onStudentSaved, student }) => {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (student) {
      setName(student.name);
      const parsedBirthdate = new Date(student.birthdate);
      const formattedBirthdate = parsedBirthdate.toISOString().split("T")[0];
      setBirthdate(formattedBirthdate);
      setAddress(student.address);
    } else {
      setName("");
      setBirthdate("");
      setAddress("");
    }
    setError(null);
  }, [student, show]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !birthdate) {
      setError("Nome e Data de nascimento são obrigatórios.");
      return;
    }

    try {
      const studentData = { name, birthdate, address };

      let response;
      if (student && student._id) {
        response = await fetch(`http://localhost:3333/students/${student._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        });
      } else {
        response = await fetch("http://localhost:3333/students", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(studentData),
        });
      }

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const savedStudent = await response.json();
      onStudentSaved(savedStudent);
      onHide();
    } catch (err) {
      setError((err as Error).message || "Erro ao salvar estudante.");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{student ? "Editar estudante" : "Criar estudante"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="studentName" className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Insira o nome do estudante" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="studentBirthdate" className="mb-3">
            <Form.Label>Data de nascimento</Form.Label>
            <Form.Control type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="studentAddress" className="mb-3">
            <Form.Label>Endereço</Form.Label>
            <Form.Control type="text" placeholder="Insira o endereço do estudante" value={address} onChange={(e) => setAddress(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            {student ? "Atualizar" : "Criar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default StudentModal;
