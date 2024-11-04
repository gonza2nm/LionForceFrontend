'use client';
import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useAuthContext } from './hooks/AuthContext.tsx';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [dni, setDni] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string | null>(null);
  const [validated, setValidated] = useState(false);
  const { login, token } = useAuthContext();
  const router = useRouter();
  const APIURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (token != null) {
      router.push(`/dashboard`);
    }
  }, [token, router]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    setResponse(null);
    setIsLoading(true);
    const response = await fetch(`${APIURL}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dni: dni,
        password: password,
      }),
    });
    if (!response.ok) {
      console.log(response.status);
      if (response.status == 401) {
        setResponse('Acceso no autorizado');
      } else if (response.status == 404) {
        setResponse('Dni o contraseña incorrecta');
      }
      setIsLoading(false);
      return null;
    }
    const res1 = await response.json();
    const authToken = {
      token: res1.token,
    };
    login(authToken);
    setResponse(null);
    router.push('/dashboard');
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-lg border-0 rounded-lg mt-5">
              <Card.Header className="bg-primary text-white text-center py-4">
                <h3 className="font-weight-light my-2">Login</h3>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit} noValidate validated={validated}>
                  <Form.Group
                    controlId="inputDni"
                    className="form-floating mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="DNI"
                      value={dni}
                      onChange={(e) => setDni(e.target.value)}
                      required
                      minLength={7}
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor, ingresa tu DNI.
                    </Form.Control.Feedback>
                    <Form.Label>DNI</Form.Label>
                  </Form.Group>

                  <Form.Group
                    controlId="inputPassword"
                    className="form-floating mb-3"
                  >
                    <Form.Control
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <Form.Control.Feedback type="invalid">
                      Por favor, ingrese su contaseña.
                    </Form.Control.Feedback>
                    <Form.Label>Contraseña</Form.Label>
                  </Form.Group>

                  <div className="d-grid">
                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
                    </Button>
                    {response != null && (
                      <span className="text-danger text-center">
                        {response}
                      </span>
                    )}
                  </div>
                </Form>
              </Card.Body>
              <Card.Footer className="text-center py-3">
                <div className="small">
                  ¿Olvidaste tu contraseña?{' '}
                  <Link
                    href="/forgot-password"
                    className="text-decoration-none"
                  >
                    Recuperar contraseña
                  </Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
