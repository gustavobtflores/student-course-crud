import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import CreateCourseModal, { Course } from "./course-modal";

interface CourseCardProps {
  course: Course;
  onCourseDeleted?: (courseId: string) => void;
  onCourseUpdated?: (course: Course) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onCourseDeleted, onCourseUpdated }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleDelete = async () => {
    const confirmed = window.confirm("Tem certeza que deseja remover este curso?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:3333/courses/${course._id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      if (onCourseDeleted && course._id) {
        onCourseDeleted(course._id);
      }
    } catch (error) {
      setDeleteError((error as Error).message || "Falha ao remover o curso.");
    }
  };

  const handleCourseSaved = (updatedCourse: Course) => {
    if (onCourseUpdated) {
      onCourseUpdated(updatedCourse);
    }
  };

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>{course.name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Código: {course.code}</Card.Subtitle>
          <Card.Text>{course.description}</Card.Text>
          {deleteError && <div className="alert alert-danger">{deleteError}</div>}
          <div className="d-flex justify-content-end">
            <Button variant="outline-primary" className="me-2" onClick={() => setShowEditModal(true)}>
              Editar
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Remover
            </Button>
          </div>
        </Card.Body>
      </Card>
      {showEditModal && <CreateCourseModal show={showEditModal} onHide={() => setShowEditModal(false)} onCourseSaved={handleCourseSaved} course={course} />}
    </>
  );
};

export default CourseCard;
