
export async function postData(data) {
  const response = await fetch("/api/certificate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response?.json();
}

export async function getData() {
  const response = await fetch("/api/certificate", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response?.json();
}

export async function getAdmin() {
  const response = await fetch("/api/admin", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response?.json();
}
