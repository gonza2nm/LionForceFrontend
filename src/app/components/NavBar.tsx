import Link from 'next/link';
import {
  Col,
  Container,
  Dropdown,
  Nav,
  Navbar,
  Offcanvas,
  Row,
} from 'react-bootstrap';
import { useAuthContext } from '../hooks/AuthContext.tsx';
import { ReactNode, useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { FaUserCircle } from 'react-icons/fa';

export default function NavBar({
  children,
  name,
  dni,
}: {
  children: ReactNode;
  name: string;
  dni: string;
}) {
  const { logout } = useAuthContext();
  const closeSession = async () => {
    await logout();
    window.location.href = '/';
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid>
      <Row>
        <Col md="auto" className="d-none d-md-block bg-primary vh-100 w-auto">
          <Nav
            className="bg-primary
             flex-column p-2 vh-100 justify-content-between"
          >
            <Container>
              <Nav.Link
                as={Link}
                className="text-light nav-link-hover-desk"
                href="/dashboard"
              >
                Inicio
              </Nav.Link>
              <Nav.Link
                as={Link}
                className="text-light nav-link-hover-desk"
                href="/dashboard/alumnos"
              >
                Alumnos
              </Nav.Link>
              <Nav.Link
                as={Link}
                className="text-light nav-link-hover-desk"
                href="/dashboard/servicios"
              >
                Servicios
              </Nav.Link>
              <Nav.Link
                as={Link}
                className="text-light nav-link-hover-desk"
                href="/dashboard/productos"
              >
                Productos
              </Nav.Link>
              <Nav.Link
                as={Link}
                className="text-light nav-link-hover-desk"
                href="/dashboard/torneos"
              >
                Torneos
              </Nav.Link>
            </Container>
            <Dropdown className="my-2" drop="up-centered">
              <Dropdown.Toggle
                variant="link"
                id="dropdown-profile"
                className="d-flex align-items-center text-white text-decoration-none"
              >
                <FaUserCircle size={24} className="me-2" />
                <span>{name}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  href={`/dashboard/profile/${dni}`}
                  className="nav-link-hover-mob"
                >
                  Ver Perfil
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  className="nav-link-hover-mob"
                  onClick={(e) => {
                    e.preventDefault();
                    closeSession();
                  }}
                >
                  Cerrar Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Col>
        <Col md={9} className="d-block d-md-none bg-primary">
          <Navbar expand="md" className="d-flex justify-content-end ">
            <IoMenu
              onClick={handleShow}
              size={36}
              color="white"
              className="cursor-pointer"
            />
          </Navbar>
          <Offcanvas show={show} onHide={handleClose} responsive="md">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <Nav.Link
                  className="text-dark nav-link-hover-mob"
                  as={Link}
                  onClick={() => {
                    handleClose();
                  }}
                  href="/dashboard"
                >
                  Inicio
                </Nav.Link>
                <Nav.Link
                  className="text-dark nav-link-hover-mob"
                  as={Link}
                  onClick={() => {
                    handleClose();
                  }}
                  href="/dashboard/alumnos"
                >
                  Alumnos
                </Nav.Link>
                <Nav.Link
                  className="text-dark nav-link-hover-mob"
                  as={Link}
                  onClick={() => {
                    handleClose();
                  }}
                  href="/dashboard/servicios"
                >
                  Servicios
                </Nav.Link>
                <Nav.Link
                  className="text-dark nav-link-hover-mob"
                  as={Link}
                  onClick={() => {
                    handleClose();
                  }}
                  href="/dashboard/productos"
                >
                  Productos
                </Nav.Link>
                <Nav.Link
                  className="text-dark nav-link-hover-mob"
                  as={Link}
                  onClick={() => {
                    handleClose();
                  }}
                  href="/dashboard/torneos"
                >
                  Torneos
                </Nav.Link>
                <Dropdown className="my-2 text-bg" drop="down-centered">
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-profile"
                    className="d-flex align-items-center text-dark text-decoration-none"
                  >
                    <FaUserCircle size={24} className="me-2" />
                    <span>{name}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      href="/profile"
                      className="nav-link-hover-mob"
                    >
                      Ver Perfil
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      className="nav-link-hover-mob"
                      onClick={(e) => {
                        e.preventDefault();
                        closeSession();
                      }}
                    >
                      Cerrar Sesión
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
        <Col md={true} as="main" className="p-3">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
