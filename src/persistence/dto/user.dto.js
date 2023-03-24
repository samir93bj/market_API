export const createUserDto = (user) => {
  const formattedUser = {
    name: user.name,
    direction: user.direction,
    edad: user.edad,
    phone: user.phone,
    username: user.username,
    password: user.password,
    salt: user.salt
  }

  return formattedUser
}

export const AuthPayloadUser = (user) => {
  const formattedUserAuth = {
    id: user._id,
    username: user.username
  }

  return formattedUserAuth
}
