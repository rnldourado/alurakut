import MainGrid from '../src/components/MainGrid';
import React from 'react'
import Box from '../src/components/Box/';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

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

export default function Home() {
  const userGithub = 'rnldourado'
  const [comunidades, setComunidades] = React.useState([{
    id: '471874515487516841',
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);
  console.log(comunidades)
  const pessoasFavoritas = ['juunegreiros', 'omariosouto', 'rafaballerini', 'peas', 'marcobrunodev', 'felipefialho']

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
            <form onSubmit={function handleCreateCummunity(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              console.log('Campo: ',dadosDoForm.get('title'))
              console.log('Campo: ',dadosDoForm.get('image'))

              const comunidade = {
                id: new Date().toISOString(),
                titulo: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')

              }
              const comunidadesAtualizadas = [...comunidades, comunidade]
              setComunidades(comunidadesAtualizadas)
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
          <ProfileRelationsBoxWrapper >
          <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`} >
                      <img src={itemAtual.image} alt={`${itemAtual.title}`} />
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
