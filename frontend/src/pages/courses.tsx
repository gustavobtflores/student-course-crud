import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CourseCard from "../components/course-card";
import CreateCourseModal from "../components/course-modal";
import { type Course } from "../components/course-modal";

export function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showModal, setShowModal] = useState(false);

  async function fetchCourses() {
    try {
      const res = await fetch("http://localhost:3333/courses");
      if (!res.ok) {
        const json = await res.json();
        throw json;
      }
      const body = await res.json();
      setCourses(body);
    } catch (err) {
      console.error("Erro ao buscar cursos:", err);
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <Container style={{ marginTop: "40px" }}>
      <Row className="align-items-center">
        <Col>
          <h1>Cursos</h1>
        </Col>
        <Col className="text-end">
          <Button id="create-new-course" size="sm" onClick={() => setShowModal(true)}>
            Adicionar curso
          </Button>
        </Col>
      </Row>
      <div className="courses__list" style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
        {courses.length > 0 ? (
          courses.map((course) => <CourseCard key={course._id} course={course} onCourseDeleted={fetchCourses} onCourseUpdated={fetchCourses} />)
        ) : (
          <span>Nenhum curso cadastrado.</span>
        )}
      </div>
      <CreateCourseModal show={showModal} onHide={() => setShowModal(false)} onCourseSaved={fetchCourses} />
    </Container>
  );
}
