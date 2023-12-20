import { Box, Text, Button } from '@skynexui/components';
import { useRouter } from 'next/router';
import nookies from 'nookies';

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  console.log('Cookies', cookies);
  const SENHA_SECRETA = '123456';
  const senhaInformadaPeloUsuario = cookies.SENHA_SECRETA;
  const isAutorizado = SENHA_SECRETA === senhaInformadaPeloUsuario;
  
  if(!isAutorizado) {
    console.log('NÃO Autorizado!!!');
    return {
      redirect: {
        permanent: false,
        destination: '/?status=401',
      }
    };
  }

  console.log('Autorizado!!!');
  return {
    props: {}
  }
}

export default function LoggedScreen(props) {
  const router = useRouter();
  return (
    <Box
      styleSheet={{
        border: '1px solid #F9703E',
        flexDirection: 'column',
        maxWidth: '400px',
        marginTop: '20%',
        marginHorizontal: 'auto',
        padding: '32px',
        borderRadius: '4px',
        boxShadow: '1px 1px 5px 0 rgba(255,69,0,0.2)',
      }}
    >
      <Text styleSheet={{ marginVertical: '32px' }}>
        Você acessou uma área protegida!
      </Text>

      <Button
        label='Logout'
        onClick={() => {
          nookies.destroy(null, 'SENHA_SECRETA');
          router.push('/')
        }}
        colorVariant='neutral'
        variant='secondary'
      />
    </Box>
  );
}
