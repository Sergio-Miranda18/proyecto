import { Route, Routes } from 'react-router-dom';
import { Login } from '../page/login/login';
import { Navbar } from '../../Navbar'
import { GestionarReserva } from '../page/Admin/GestionarReserva';
import { Index } from '../page/user/Index';
import { Registro } from '../page/register/registro';
import { PageNotFound } from '../componentes/PageNotFound';
import { Reserva } from '../page/user/Reserva';
import { GestionarServicios } from '../page/Admin/GestionarServicios';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="*" element={<PageNotFound />} />
          <Route element={<Navbar />}>

            {"USUARIO"}
            <Route path="/Index" element={
              <ProtectedRoute allowedRoles={['USER']} element={<Index />} />
            } />
            <Route path="/Reserva" element={
              <ProtectedRoute allowedRoles={['USER']} element={<Reserva />} />
            } />

            {"ADMINISTRADOR"}
            <Route path="/GestionarReserva" element={
              <ProtectedRoute allowedRoles={['ADMIN']} element={<GestionarReserva />} />
            } />
            <Route path="/GestionarServicios" element={
              <ProtectedRoute allowedRoles={['ADMIN']} element={<GestionarServicios />} />
            } />

          </Route>
        </Route>
      </Routes>
    </>
  );
};