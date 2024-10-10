import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import './Reserva.css'
import axios from 'axios';

export const Reserva = () => {
    const generarPrecioAleatorio = () => {
        return Math.floor(Math.random() * (5000000 - 300000 + 1)) + 300000;
    };
    const [formData, setFormData] = useState({
        email: localStorage.getItem('username') || '',
        precio: '',
        fecha: '',
        local: '',
        categoria: '',
        estado: 'EN PROCESO',
        paquete: '',

    });
    const [localTypes, setLocalTypes] = useState([]);
    const [categoriaTypes, setCategoriaTypes] = useState([]);
    const [paqueteTypes, setPaquetesTypes] = useState([]);

    useEffect(() => {
        const fetchLocalTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/local/get');
                console.log('Locales obtenidos:', response.data);
                setLocalTypes(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de identificación de la base de datos', error);
            }
        };
        const fetchPaqueteTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/paquete/get');
                console.log('paquetes obtenidos:', response.data);
                setPaquetesTypes(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de identificación de la base de datos', error);
            }
        };
        const fetchCategoriaTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/categoria/get');
                console.log('Categorias obtenidos:', response.data);
                setCategoriaTypes(response.data);
            } catch (error) {
                console.error('Error al obtener tipos de persona de la base de datos', error);
            }
        };
        const PersonResponse = async () => {
        const personResponse = await axios.get('http://localhost:8080/api/reserva/get');
        console.log('Reservas obtenidos:', personResponse.data);

    };   PersonResponse();
        fetchLocalTypes();
        fetchCategoriaTypes();
        fetchPaqueteTypes();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleReset = () => {
        setFormData({
            email: localStorage.getItem('username') || '',
            precio: '',
            fecha: '',
            local: '',
            categoria: '',
            estado: 'EN PROCESO',
            paquete: '',
        });
    }
    const handleCalculatePrice = () => {
        const precioAleatorio = generarPrecioAleatorio();
        setFormData({
            ...formData,
            precio: precioAleatorio,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log('Datos del formulario a enviar:', formData);

            const selectedLocalTypes = localTypes.find(type => type.idLocal === parseInt(formData.local));
            const selectedCategoriaTypes = categoriaTypes.find(type => type.id === parseInt(formData.categoria));
            const selectedPaquetesTypes = paqueteTypes.find(type => type.id === parseInt(formData.paquete));

            const requestData = await axios.post('http://localhost:8080/api/reserva/save',{
                local : { idLocal: selectedLocalTypes ? selectedLocalTypes.idLocal : null },
                email: {email: formData.email},
                estado: formData.estado,
                fecha: formData.fecha,
                precio: formData.precio,
                categoria: { id: selectedCategoriaTypes ? selectedCategoriaTypes.id : null },
                paquete: { id: selectedPaquetesTypes ? selectedPaquetesTypes.id : null },

            });

            console.log('Respuesta al guardar persona:', requestData.data);
            
            console.log('Reserva registrada correctamente');
            alert('Reserva registrada correctamente');


        } catch (error) {
            console.error('Error al guardar información en la base de datos', error);
        }
        handleReset();
    };

    return (
        <div>
            <div className="res">
                <div className="area">
                    <div className="container w-75 bg-primary mt-5 rounded shadow ">
                        <div className="row alig-items-stretch">
                            <div className="col bg-white p-5 rounded-end">
                                <h2 className="fw-bold text-center py-5">¡¡RESERVA TUS EVENTOS!!</h2>
                                <form action="" onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="local">Lugar</label>
                                        <select className="form-select" aria-label="Default select example" 
                                        id='local'
                                        name="local" 
                                        value={formData.local}
                                            onChange={handleChange} required
                                        >
                                            <option key="" value="">Seleccione el tipo</option>
                                            {localTypes.map((type) => (
                                                <option key={type.idLocal} value={type.idLocal}>
                                                {type.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="paquete">Paquete</label>
                                        <select className="form-select" aria-label="Default select example" 
                                        id='paquete'
                                        name="paquete" 
                                        value={formData.paquete}
                                            onChange={handleChange} required
                                        >
                                            <option key="" value="">Seleccione el tipo</option>
                                            {paqueteTypes.map((type) => (
                                                <option key={type.id} value={type.id}>
                                                {type.nombre}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="categoria">Categoria</label>
                                        <select className="form-select" aria-label="Default select example" 
                                        id='categoria'
                                        name="categoria" 
                                        value={formData.categoria}
                                            onChange={handleChange} required
                                        >
                                            <option key="" value="">Seleccione el tipo</option>
                                            {categoriaTypes.map((type) => (
                                                <option key={type.id} value={type.id}>
                                                {type.descripcion}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="fecha" className="form-label">Fecha del evento</label>
                                        <input type="date" className="form-control" name="fecha" value={formData.fecha}
                                            onChange={handleChange} id='fecha'required />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="precio" className="form-label">Precio</label>
                                        <input type="text" className="form-control" name="precio" value={formData.precio}
                                            readOnly disabled id='precio' required />
                                    </div>
                                    <div className="d-grid">
                                        <button type="button" className="btn btn-secondary mb-3" onClick={handleCalculatePrice}>
                                            Calcular Precio
                                        </button>
                                        <button type="submit" className="btn btn-primary">Reservar</button>
                                    </div>
                                    <a href="/Index">Atras</a>
                                </form>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}


