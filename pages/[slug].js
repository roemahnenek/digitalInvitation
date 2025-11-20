import TemplateRenderer from "../components/TemplateRenderer";
import dbConnect from '../lib/dbConnect';
import Invitation from '../models/Invitation';

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const { to: guestName = null } = context.query;

  try {
    await dbConnect();

    const result = await Invitation.findOne({ slug }).lean();

    if (!result) {
      return { notFound: true };
    }

    // Mongoose objects are not directly serializable, so we need to convert it
    const data = JSON.parse(JSON.stringify(result));

    return { 
      props: { 
        template_code: data.template_code || "classic-01", 
        data, 
        guestName 
      } 
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}

export default function InvitationPage({ template_code, data, guestName }) {
  return <TemplateRenderer template_code={template_code} data={data} guestName={guestName} />;
}
