'use client';
import Link from 'next/link.js';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Button,
  Col,
  Container,
  Nav,
  Navbar,
  Offcanvas,
  Row,
} from 'react-bootstrap';
import { useAuthContext } from '../hooks/authContext.tsx';

export default function Dashboard() {
  const { logout, academyId, rol } = useAuthContext();
  const router = useRouter();
  const closeSession = async () => {
    await logout();
    router.push('/auth/login');
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {}, [academyId, rol]);
  return (
    <>
      <Container fluid>
        <Row>
          {/* Sidebar visible only on medium screens and larger */}
          <Col md="auto" className="d-none d-md-block bg-primary vh-100 w-auto">
            <Nav
              className="bg-primary
             flex-column p-3"
            >
              <Nav.Link as={Link} className="text-bg-primary" href="/dashboard">
                Inicio
              </Nav.Link>
              <Nav.Link
                as={Link}
                className="text-bg-primary"
                href="/dashboard/alumnos"
              >
                Alumnos
              </Nav.Link>
              <Nav.Link
                as={Link}
                className="text-bg-primary"
                href="/dashboard/servicios"
              >
                Servicios
              </Nav.Link>
              <Nav.Link
                as={Link}
                className="text-bg-primary"
                href="/dashboard/productos"
              >
                Productos
              </Nav.Link>
              <Nav.Link
                as={Link}
                className="text-bg-primary"
                href="/dashboard/torneos"
              >
                Torneos
              </Nav.Link>
              <Nav.Link
                as={Link}
                onClick={() => {
                  closeSession();
                }}
                href=""
                className="text-bg-primary"
              >
                Close Sesion
              </Nav.Link>
            </Nav>
          </Col>

          {/* Main content for small screens */}
          <Col md={9} className="d-block d-md-none">
            <Navbar bg="light" expand="md">
              <Button variant="primary" onClick={handleShow}>
                Open Menu
              </Button>
            </Navbar>

            {/* Offcanvas for small screens */}
            <Offcanvas show={show} onHide={handleClose} responsive="md">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="flex-column">
                  <Nav.Link as={Link} href="/dashboard">
                    Inicio
                  </Nav.Link>
                  <Nav.Link as={Link} href="/dashboard/alumnos">
                    Alumnos
                  </Nav.Link>
                  <Nav.Link as={Link} href="/dashboard/servicios">
                    Servicios
                  </Nav.Link>
                  <Nav.Link as={Link} href="/dashboard/productos">
                    Productos
                  </Nav.Link>
                  <Nav.Link as={Link} href="/dashboard/torneos">
                    Torneos
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    onClick={() => {
                      closeSession();
                    }}
                    href=""
                  >
                    Close Sesion
                  </Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Offcanvas>
          </Col>
          <Col md={true} className="p-3">
            <main>
              <h1>Dashboard</h1>
            </main>
          </Col>
        </Row>
      </Container>
    </>
  );
}
