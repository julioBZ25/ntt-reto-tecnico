export async function apiFetch(){
  const response = await fetch('https://randomuser.me/api//?results=15&inc=gender,name,nat,email,nat,dob,picture');
  const data = await response.json();
  return data
}