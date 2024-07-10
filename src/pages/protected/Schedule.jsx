import { useForm } from "react-hook-form"
import "../../form.css";

export default function Schedule() {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log("RESULT", data);
    alert(JSON.stringify(data));
  };
  if (errors) alert(errors);

  return (
    <>  <form onSubmit={handleSubmit(onSubmit)}>
      <label>First name</label>
      <input
        type="text"
        {...register("First name", { required: true, maxLength: 80 })}
      />
      <label>Last name</label>
      <input
        type="text"
        {...register("Last name", { required: true, maxLength: 100 })}
      />
      <label>Email</label>
      <input
        type="text"
        {...register("Email", {
          required: true,
          pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        })}
      />
      <label>Mobile number</label>
      <input
        type="tel"
        {...register("Mobile number", {
          required: true,
          maxLength: 11,
          minLength: 8
        })}
      />
      <label>Title</label>
      <select name="Title" {...register("title", { required: true })}>
        <option value="Mr">Mr</option>
        <option value="Mrs">Mrs</option>
        <option value="Miss">Miss</option>
        <option value="Dr">Dr</option>
      </select>
      <label>Are you a developer?</label>
      <input
        type="radio"
        value="Yes"
        {...register("developer", { required: true })}
      />
      <input
        type="radio"
        value="No"
        {...register("developer", { required: true })}
      />

      <input type="submit" />
    </form>
    </>);
}