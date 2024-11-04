'use client';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import DonutChart from '../components/DonutChart.tsx';

export default function Dashboard() {
  const totalAlumnos = 125;
  const proximoCumpleanios = [
    { nombre: 'Juan Pérez', fecha: '02 Nov' },
    { nombre: 'María López', fecha: '15 Nov' },
    { nombre: 'Carlos Sánchez', fecha: '20 Nov' },
  ];
  const ingresos = 198000.23;
  const egresos = 109270.25;

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col md={12} lg={6} className="mt-2">
          <Card style={{ height: '400px' }}>
            <Card.Body>
              <Card.Title className="text-center">
                Ingresos y Egresos
              </Card.Title>
              <DonutChart ingresos={ingresos} egresos={egresos} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} lg={6} className="d-flex flex-column gap-2 my-2">
          <Card>
            <Card.Body>
              <Card.Title>Total de Alumnos</Card.Title>
              <h2>{totalAlumnos}</h2>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Próximos Cumpleaños</Card.Title>
              <ListGroup variant="flush">
                {proximoCumpleanios.map((cumple, index) => (
                  <ListGroup.Item key={index}>
                    {cumple.nombre} - {cumple.fecha}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
