import MainGrid from '../src/components/MainGrid';
import React from 'react'
import Box from '../src/components/Box/';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import nookies from 'nookies'
import jwt from 'jsonwebtoken'

function ProfileSideBar(props) {

  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} alt="Imagem de usuário" style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a href={`https://github.com/${props.githubUser}`} className="boxLink">
          @{props.githubUser}
        </a>

      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box >
  )
}

function ProfileRelationsBox(propriedades) {
  return (

    <ProfileRelationsBoxWrapper >
      <h2 className="smallTitle"> {propriedades.title} ({propriedades.items.length})</h2>
      <ul>
        {/* {seguidores.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`https//github.com/${itemAtual}.png`} >
                      <img src={itemAtual.image} alt={`${itemAtual.title}`} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })} */}
      </ul>
    </ProfileRelationsBoxWrapper >
  )
}

export default function Home(props) {
  const userGithub = props.githubUser
  const [comunidades, setComunidades] = React.useState([]);
  const pessoasFavoritas = [
    'danielhe4rt',
    'omariosouto',
    'rafaballerini',
    'pachicodes',
    'marcobrunodev',
    'maykbrito'
  ]

  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function () {
    // GET
    fetch(`https://api.github.com/users/${userGithub}/followers`)
      .then(function (respostaDoServidor) {
        return respostaDoServidor.json();
      })
      .then(function (respostaCompleta) {
        setSeguidores(respostaCompleta);
      })


    // API GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization': 'b9e250d6bbfb248ce8713a557b60d4',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        "query": `query {
        allCommunities {
          id 
          title
          imageUrl
          creatorSlug
        }
      }` })
    })
      .then((response) => response.json()) // Pega o retorno do response.json() e já retorna
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        console.log(comunidadesVindasDoDato)
        setComunidades(comunidadesVindasDoDato)
      })
    // .then(function (response) {
    //   return response.json()
    // })

  }, [])

  // 1 - Criar um box que vai ter um map, baseado nos items do array
  // que pegamos do GitHub

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar githubUser={userGithub} />
        </div>
        <div className="wellcomeArea" style={{ gridArea: 'wellcomeArea' }}>
          <Box >
            <h1 className="title">Bem-vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              console.log('Campo: ', dadosDoForm.get('title'));
              console.log('Campo: ', dadosDoForm.get('image'));

              const comunidade = {
                title: dadosDoForm.get('title'),
                imageUrl: dadosDoForm.get('image'),
                creatorSlug: userGithub,
              }

              fetch('/api/comunidades', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(comunidade)
              })
                .then(async (response) => {
                  const dados = await response.json();
                  console.log(dados.registroCriado);
                  const comunidade = dados.registroCriado;
                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas)
                })
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={seguidores} />
          <ProfileRelationsBoxWrapper >
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/comunidades/${itemAtual.id}`} >
                      <img src={itemAtual.imageUrl} alt={`${itemAtual.title}`} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper >

          <ProfileRelationsBoxWrapper >
            <h2 className="smallTitle">Pessoas da comunidade ({pessoasFavoritas.length})</h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} >
                      <img src={`https://github.com/${itemAtual}.png`} alt={`${itemAtual}`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((resposta) => resposta.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}