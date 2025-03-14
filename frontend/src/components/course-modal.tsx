import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export interface Course {
  _id?: string;
  name: string;
  code: string;
  description: string;
}

interface CreateCourseModalProps {
  show: boolean;
  onHide: () => void;
  onCourseSaved: (course: Course) => void;
  course?: Course;
}

const CourseModal: React.FC<CreateCourseModalProps> = ({ show, onHide, onCourseSaved, course }) => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (course) {
      setName(course.name || "");
      setCode(course.code || "");
      setDescription(course.description || "");
    } else {
      setName("");
      setCode("");
      setDescription("");
    }
    setError(null);
  }, [course, show]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !code) {
      setError("Nome e Código são obrigatórios.");
      return;
    }

    try {
      const courseData = { name, code, description };
      let response;

      if (course && course._id) {
        response = await fetch(`http://localhost:3333/courses/${course._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseData),
        });
      } else {
        response = await fetch("http://localhost:3333/courses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(courseData),
        });
      }

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const savedCourse = await response.json();
      onCourseSaved(savedCourse);
      onHide();
    } catch (err) {
      setError((err as Error).message || "Erro ao salvar o curso.");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{course ? "Editar Curso" : "Criar Curso"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="courseName" className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" placeholder="Digite o nome do curso" value={name} onChange={(e) => setName(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="courseCode" className="mb-3">
            <Form.Label>Código</Form.Label>
            <Form.Control type="text" placeholder="Digite o código do curso" value={code} onChange={(e) => setCode(e.target.value)} required />
          </Form.Group>
          <Form.Group controlId="courseDescription" className="mb-3">
            <Form.Label>Descrição</Form.Label>
            <Form.Control as="textarea" placeholder="Digite a descrição do curso" value={description} onChange={(e) => setDescription(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            {course ? "Atualizar Curso" : "Criar Curso"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CourseModal;
