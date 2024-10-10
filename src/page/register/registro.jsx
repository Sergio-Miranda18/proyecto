import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export const Registro = () => {
    const [formData, setFormData] = useState({
        email: '',
        nombre: '',
        apellido: '',
        documento: '',
        clave: '',
        clave1: '',
        telefono: '',

    });

    useEffect(() => {
        const verUsuario = async () => {
            const response = await axios.get('http://localhost:8080/api/usuario/get');
            console.log(response.data)
        }

        verUsuario();
    }, []);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const handleReset = () => {
        setFormData({
            email: '',
            nombre: '',
            apellido: '',
            documento: '',
            clave: '',
            clave1: '',
            telefono: '',
        });
    }

    const onLogin = async (e) => {
        e.preventDefault();

        try {
            console.log('Datos del formulario a enviar:', formData);
            if (formData.clave === formData.clave1) {
                console.log(formData.clave)
                const requestData = await axios.post('http://localhost:8080/api/auth/register',{
                    email: formData.email,
                    nombre: formData.nombre,
                    apellido: formData.apellido,
                    documento: formData.documento,
                    clave: formData.clave,
                    telefono: formData.telefono,

            });

                console.log('Respuesta al guardar usuario:', requestData.data);

                console.log('Usuario registrada correctamente');
                alert('Usuario registrada correctamente');
                handleReset();
            }
            else{
                alert('Contraseñas no coinciden');
            }

        } catch (error) {
            console.error('Error al guardar información en la base de datos', error);
        }
       
    };

    return (

        <div className="res">
            <div className="area">
                <div className="container w-75 bg-primary mt-5 rounded shadow">
                    <div className="row align-items-stretch">
                        <div className="col bg-white p-5 rounded-end">

                            <h2 className="fw-bold text-center py-5">¡¡Bienvenido!!</h2>
                            <h2 className="fw-bold text-center mb-4">Regístrate</h2>
                            <form className="tu_script_de_registro.php" onSubmit={onLogin}>


                                <div className="mb-3">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre}
                                        onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="apellido" className="form-label">Apellido</label>
                                    <input type="apellido" className="form-control" id="apellido" name="apellido" value={formData.apellido}
                                        onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="documento" className="form-label">Documento de Identidad</label>
                                    <input type="documento" className="form-control" id="documento" name="documento" value={formData.documento}
                                        onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                                    <input type="email" className="form-control" id="email" name="email" required value={formData.email}
                                        onChange={handleChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="telefono" className="form-label">Telefono</label>
                                    <input type="telefono" className="form-control" id="telefono" name="telefono" required value={formData.telefono}
                                        onChange={handleChange} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="clave" className="form-label">Contraseña</label>
                                    <input type="password" className="form-control" id="clave" name="clave" required value={formData.clave}
                                        onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="clave1" className="form-label">Confirmar Contraseña</label>
                                    <input type="password" className="form-control" id="clave1" name="clave1" value={formData.clave1}
                                        onChange={handleChange} required />
                                </div>

                                <div className="d-grid mb-4">
                                    <button type="submit" className="btn btn-primary">Registrarse</button>
                                </div>

                                <div className="text-center">
                                    <span>¿Ya tienes una cuenta? <a href="/Login">Inicia Sesión</a></span>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};