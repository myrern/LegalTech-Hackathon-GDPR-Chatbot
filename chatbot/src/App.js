import React, { useState, useEffect } from 'react';
import ChatWindow from './Components/ChatWindow';
import UserInput from './Components/UserInput';
import Norwayflag from './assets/flag_norway.png';
import Logo from './assets/bot-icon.png'
import Noti from './assets/noti.png'
import './App.css'; 

function App() {
  const answers = [
    "Hei Thomas, det er flott at du tar initiativ til dette viktige arbeidet! En behandlingsprotokoll skal inneholde informasjonen du ser under. <br/> <br/>1.	Formålene med behandlingen. <br/> <br/> 2.	Behandlingsgrunnlaget for behandlingen. <br/> <br/> 3.	Kontaktopplysninger til den behandlingsansvarlige og eventuelt andre relevante parter. <br/> <br/> 4.	Beskrivelse av kategoriene av registrerte og personopplysningene. <br/> <br/>5.	Kategoriene av mottakere for personopplysningene. <br/> <br/> 6.	Informasjon om eventuelle overføringer av personopplysninger. <br/> <br/> 7.	Tidsfrister for sletting av opplysningene. <br/> <br/> 8.	Beskrivelse av tekniske og organisatoriske sikkerhetstiltak. <br/> <br/>Vi starter med punkt 1 og går deretter videre til punkt 2. Er du klar til å begynne med formålene med behandlingen?",
    "Å beskrive formålet betyr å forklare hvorfor vi samler inn og behandler sykefraværsdata. Eksempler kan være: <br/> <br/>1.	Administrere ansattes sykefravær for å sikre at virksomheten overholder arbeidsrettens krav. <br/> <br/>2.	Støtte ansattes helse og velvære ved å følge opp med nødvendige tiltak eller tilbud om tilrettelegging. <br/> <br/>3.	Beregne og utbetale sykepenger i henhold til gjeldende lovgivning. <br/> <br/>4.	Overvåke og analysere sykefraværsmønstre for å forbedre arbeidsmiljøet og redusere fravær. <br/> <br/>",
    "Absolutt. Formålet med behandlingen av sykefraværsdata er å effektivt administrere og overvåke ansattes sykefravær for å støtte deres helse og virksomhetens personalforvaltning. Dette inkluderer registrering av fravær, oppfølging av den ansattes helse og velvære, og tilrettelegging for nødvendige arbeidsmiljøtilpasninger. Ser dette bra ut?",
    "Neste steg er å finne behandlingsgrunnlaget. For sykefravær bruker vi GDPR artikkel 6 nr. 1 bokstav c og 9 nr. 2 bokstav b, jf. personopplysningsloven § 6 jf. arbeidsmiljøloven § 3-1, som dekker behandling av helseopplysninger.",
    `Selvfølgelig. Her er en foreløpig beskrivelse protokoll: <br/><br/>` + 
    `• Behandlingsansvarlig: Fjorde IT<br/><br/>` +
`• Kontaktperson: Thomas Toget<br/><br/>` +
`• Personvernombud: Sonja Summe<br/><br/>` +
`• Hva gjelder behandlingen?: Føre og følge opp sykefravær<br/><br/>` +
`• Formål med behandlingen: Formålet med behandlingen av sykefraværsdata er å effektivt administrere og overvåke ansattes sykefravær for å støtte deres helse og virksomhetens personalforvaltning. Dette inkluderer registrering av fravær, oppfølging av den ansattes helse og velvære, og tilrettelegging for nødvendige arbeidsmiljøtilpasninger.<br/><br/>` +
`• Kategorier av registrerte: Ansatte<br/><br/>` +
`• Kategorier av personopplysninger: Personnavn, Adresse, Kontaktinformasjon, Fødselsinformasjon, Familie, HR- og lønnsopplysninger, Timeregistrering og fraværskode, Helseopplysninger<br/><br/>` +
`• Kategorier av mottakere: Leverandører og offentlige etater<br/><br/>` +
`• Behandlingsgrunnlag: GDPR artikkel 6 nr. 1 bokstav c og 9 nr. 2 bokstav b, jf. personopplysningsloven § 6 jf. arbeidsmiljøloven § 3-1<br/><br/>` +
`• Planlagte tidsfrister for sletting: 2 år<br/><br/>` +
`• I hvilke av våre systemer behandles opplysningene?: HR Master 2000<br/><br/>` +
`• Databehandlere: HR Master 2000<br/><br/>` +
`• Generell beskrivelse av tekniske og organisatoriske sikkerhetstiltak: Tilgangskontroll etter definerte roller, ende-til- endekryptering og kryptering ved lagring ved hjelp av asymmetrisk kryptering med ekstern nøkkelforvaltning. Rutiner for jevnlig gjennomgang av nødvendige informasjon for sykefraværsføring.<br/><br/>` +
`• Overføringer til tredjeland: Nei <br/><br/>` +
`Vil du gjøre noen endringer?`,
"Her er den endelige portokollen: <a href='https://acrobat.adobe.com/id/urn%3Aaaid%3Asc%3AEU%3Ab1bcbf54-da91-43bd-bc3b-45eccc3e36d7/?locale=nb-NO&filetype=application%2Fpdf&viewer%21megaVerb=group-discover' target='_blank'>Åpne protokollen</a>"

  ];



  const [messages, setMessages] = useState([]);
  const [currentBotMessage, setCurrentBotMessage] = useState('');
  const [answerIndex, setAnswerIndex] = useState(0);
  const [activeMenuItem, setActiveMenuItem] = useState(null);

  const handleMenuItemClick = (itemName) => {
    setActiveMenuItem(itemName);
    // Handle menu item click...
  };

  const simulateTyping = (fullMessage, author) => {
    let typedMessage = '';
    const chars = fullMessage.split('');
    let charIndex = 0;

    const typeChar = () => {
      if (charIndex < chars.length) {
        typedMessage += chars[charIndex++];
        setCurrentBotMessage(typedMessage); // Update for each char typed
        setTimeout(typeChar, Math.floor(Math.random() * 10));
      } else {
        setMessages(m => [...m, { content: typedMessage, author: 'bot' }]);
        setCurrentBotMessage(''); // Clear when message is complete
      }
    };

    typeChar();
  };

  const handleSendMessage = (newMessage) => {
    if (newMessage.trim() !== '') {
      setMessages(m => [...m, { content: newMessage, author: 'user' }]);
      setTimeout(() => {
        if (!currentBotMessage && answerIndex < answers.length) {
          simulateTyping(answers[answerIndex], 'bot');
          setAnswerIndex((currentIndex) => currentIndex + 1);
        }
      }, 1000);
    }
  };

  return (
    <div className="app">
      <div className="side-menu">
        <p className='logo-text'>
        <img src={Logo} alt="ProtoBot_Logo" style={{ width: '24px', height: '24px'}} /> ProtoBot
        </p>
        <p>
          Hjem
        </p>
        <p>
          Risiko
        </p>
        <p>
          Varslinger <img src={Noti} alt="Notification" style={{ width: '30px', height: '30px', marginLeft: '5px' }} />
        </p>
        {/* ... */}
        <div className='earlier-protocols'>
          <p className='title1'>Tidligere protokoller</p>
          <p onClick={() => handleMenuItemClick('proto1')} className={activeMenuItem === 'proto1' ? 'active' : ''}>
          Føre og følge opp sykefravær
          </p>
          <p>
          Behandling av IT-henvendelser
          </p>
          <p>
          Utbetaling av lønn
          </p>
          {/* ... other protocols */}
        </div>
        <div className="company-details">
          <p className='title1'>Firmainformasjon</p>
          <p>Fjorde IT</p>
          <p>Land <img src={Norwayflag} alt="Norwegian Flag" style={{ width: '20px', height: '14px', marginLeft: '5px' }} /></p>
          <p>NO 12XXXXXXXX</p>
        </div>

        <p className='dark-mode'>Mørkt tema</p>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="chat-container">
        <ChatWindow messages={messages} currentBotMessage={currentBotMessage} />
        <UserInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default App;