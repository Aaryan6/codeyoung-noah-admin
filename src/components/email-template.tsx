import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  phone,
}) => (
  <div>
    <h2>New user registerd in GenAI Course!</h2>
    <h3>Name: {name}</h3>
    <h3>Email: {email}</h3>
    <h3>Phone: {phone}</h3>
  </div>
);
