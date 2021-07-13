import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box/';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSideBar(props) {

  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} alt="Imagem de usuário" style={{ borderRadius: '8px' }} />
    </Box >
  )
}

export default function Home() {
  const userGithub = 'rnldourado'
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
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper >
            <h2 className="smallTitle">Pessoas da comunidade {pessoasFavoritas.length}</h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} alt={`${itemAtual}`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box >
            Comunidades
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
