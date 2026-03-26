/**
 * DTO de usuario: expone solo información no sensible.
 * Omite password, __v, etc.
 */
export default class UserDTO {
  constructor(user) {
    this.id = user._id;
    this.nombre = `${user.first_name} ${user.last_name}`;
    this.email = user.email;
    this.edad = user.age;
    this.rol = user.role;
    this.carrito = user.cart;
  }
}
