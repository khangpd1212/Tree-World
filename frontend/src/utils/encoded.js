export const encoded = {
  encodedAdmin (token) {
    const encodedBody = token.split(".")[1];
  
    const { isAdmin, id } = encodedBody ? JSON.parse(window.atob(encodedBody)) : {};
    return { isAdmin: isAdmin, id: id}
  },
  encodedUser (token) {
    const encodedBody = token.split(".")[1];

    const { isAdmin, id } = encodedBody ? JSON.parse(window.atob(encodedBody)) : {};
    return { isAdmin: isAdmin, id: id }
  },
}
