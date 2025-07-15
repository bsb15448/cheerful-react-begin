import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';

const PrivacyPolicy = () => {
  useVisitorTracking('/privacy-policy');
  
  return (
    <div className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-8 text-center">
            Politique de confidentialité
          </h1>
          
          <div className="prose prose-slate max-w-none">
            <p className="text-sm text-slate-600 mb-8">
              <strong>Dernière mise à jour :</strong> 25 février 2025
            </p>

            <div className="space-y-8">
              <section>
                <p className="text-slate-700 leading-relaxed">
                  Cette politique de confidentialité explique comment Mylittlehero (le « Site », « nous », « notre » ou « nos ») collecte, utilise et divulgue vos informations personnelles lorsque vous visitez, utilisez nos services ou effectuez un achat sur www.mylittlehero.co (le « Site ») ou communiquez autrement avec nous au sujet du Site (conjointement, les « Services »). Aux fins de la présente politique de confidentialité, « vous », « votre » et « vos » vous désignent en tant qu'utilisateur des Services, que vous soyez un client, un visiteur du site web ou une autre personne dont nous avons collecté les informations conformément à la présente politique de confidentialité.
                </p>
                <p className="text-slate-700 leading-relaxed font-semibold mt-4">
                  Veuillez lire attentivement la présente politique de confidentialité.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Modifications de la présente politique de confidentialité</h2>
                <p className="text-slate-700 leading-relaxed">
                  Nous pouvons mettre à jour la présente politique de confidentialité de temps à autre, notamment pour refléter les changements apportés à nos pratiques ou pour d'autres raisons opérationnelles, juridiques ou réglementaires. Nous publierons la politique de confidentialité révisée sur le Site, actualiserons la date de « Dernière mise à jour » et prendrons toute autre mesure requise par la législation en vigueur.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Comment nous collectons et utilisons vos informations personnelles</h2>
                <p className="text-slate-700 leading-relaxed">
                  Pour fournir les Services, nous collectons et avons collecté au cours des 12 derniers mois des informations personnelles vous concernant issues de diverses sources, comme indiqué ci-dessous. Les informations que nous collectons et utilisons varient en fonction de la manière dont vous interagissez avec nous.
                </p>
                <p className="text-slate-700 leading-relaxed mt-4">
                  En plus des utilisations spécifiques exposées ci-dessous, nous pouvons utiliser les informations que nous collectons à votre sujet pour communiquer avec vous, fournir ou améliorer les Services, nous conformer à toute obligation légale applicable, faire respecter les conditions de service applicables et protéger ou défendre les Services, nos droits et les droits de nos utilisateurs ou autres.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Informations personnelles que nous collectons</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Les types d'informations personnelles que nous obtenons à votre sujet dépendent de la manière dont vous interagissez avec notre Site et utilisez nos Services. Lorsque nous utilisons le terme « informations personnelles », nous faisons référence aux informations qui vous identifient, vous concernent, vous décrivent ou peuvent être associées à vous. Les sections suivantes décrivent les catégories et les types spécifiques d'informations personnelles que nous collectons.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Informations que nous collectons directement auprès de vous</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Les informations que vous nous soumettez directement via nos Services peuvent inclure :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li><strong>Des coordonnées</strong> notamment votre nom, adresse, numéro de téléphone, et e-mail.</li>
                  <li><strong>Des informations de commande</strong> notamment votre nom, votre adresse de facturation, votre adresse d'expédition, votre confirmation de paiement, votre e-mail et numéro de téléphone.</li>
                  <li><strong>Des informations du compte</strong> notamment votre nom d'utilisateur, votre mot de passe, vos questions de sécurité et d'autres informations utilisées à des fins de sécurité du compte.</li>
                  <li><strong>Les informations sur le service à la clientèle</strong> notamment les informations que vous choisissez d'inclure dans vos communications avec nous, par exemple lorsque vous envoyez un message par l'intermédiaire des Services.</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-4">
                  Certaines fonctionnalités des Services peuvent vous imposer de nous fournir directement certaines informations vous concernant. Vous pouvez choisir de ne pas fournir ces informations, mais cela peut vous empêcher d'utiliser ou d'accéder à ces fonctionnalités.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Informations que nous collectons sur votre utilisation</h2>
                <p className="text-slate-700 leading-relaxed">
                  Nous pouvons également collecter automatiquement certaines informations sur votre interaction avec les Services (« <strong>Données d'utilisation</strong> »). Pour ce faire, nous pouvons utiliser des cookies, des pixels et des technologies similaires (« <strong>Cookies</strong> »). Les Données d'utilisation peuvent inclure des informations sur la façon dont vous accédez à notre Site et à votre compte et les utilisez, y compris des informations sur l'appareil, des informations sur le navigateur, des informations sur votre connexion réseau, votre adresse IP et d'autres informations relatives à votre interaction avec les Services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Informations que nous obtenons de la part de tiers</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Enfin, nous pouvons obtenir des informations vous concernant auprès de tiers, notamment auprès de fournisseurs et de prestataires de services qui sont susceptibles de collecter des informations en notre nom, tels que :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>Des entreprises qui prennent en charge notre Site et nos Services, comme Shopify.</li>
                  <li>Nos organismes de traitement des paiements, qui collectent des informations de paiement (p. ex. des informations sur le compte bancaire, la carte de crédit ou de débit, l'adresse de facturation) pour traiter votre paiement afin d'exécuter vos commandes et de vous fournir les produits ou services que vous avez demandés, en vue d'exécuter le contrat que nous avons conclu avec vous.</li>
                  <li>Lorsque vous visitez notre Site, ouvrez ou cliquez sur les e-mails que nous vous envoyons, ou interagissez avec nos Services ou nos publicités, nous, ou des tiers avec lesquels nous travaillons, pouvons collecter automatiquement certaines informations à l'aide de technologies de suivi en ligne telles que les pixels, les balises Web, les kits de développeurs de logiciels, les bibliothèques tierces et les cookies.</li>
                </ul>
                <p className="text-slate-700 leading-relaxed mt-4">
                  Toute information que nous obtenons de la part de tiers sera traitée conformément à la présente politique de confidentialité. Voir également la section ci-dessous, <em>Site web et Liens tiers.</em>
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Comment nous utilisons vos informations personnelles</h2>
                <ul className="list-disc pl-6 space-y-3 text-slate-700">
                  <li><strong>Fourniture des Produits et des Services.</strong> Nous utilisons vos informations personnelles pour vous fournir les Services afin d'exécuter le contrat que nous avons conclu avec vous, notamment pour traiter vos paiements, exécuter vos commandes, vous envoyer des notifications relatives à votre compte, vos achats, retours, échanges ou à d'autres transactions, pour créer, tenir et gérer votre compte, organiser l'expédition, faciliter les éventuels retours et échanges ainsi que d'autres caractéristiques et fonctionnalités liées à votre compte. Nous pouvons également améliorer votre expérience d'achat en permettant à Shopify de faire correspondre votre compte avec d'autres services Shopify que vous pouvez choisir d'utiliser. Dans ce cas, Shopify traitera vos informations comme indiqué dans sa politique de confidentialité et sa politique de confidentialité relative aux consommateurs.</li>
                  <li><strong>Marketing et publicité.</strong> Nous pouvons utiliser vos informations personnelles à des fins de marketing et de promotion, par exemple pour envoyer des communications marketing, publicitaires et promotionnelles par e-mail, SMS ou courrier postal, et pour vous montrer des publicités pour des produits ou des services. Cela peut inclure l'utilisation de vos informations personnelles pour mieux adapter les Services et la publicité sur notre Site et d'autres sites web. Si vous résidez dans l'EEE, le fondement juridique de ces activités de traitement de données réside dans notre intérêt légitime à vendre nos produits, conformément à l'art. 6 (1) (f) du RGPD.</li>
                  <li><strong>Sécurité et prévention de la fraude.</strong> Nous utilisons vos informations personnelles pour détecter, enquêter ou prendre des mesures concernant d'éventuelles activités frauduleuses, illégales ou malveillantes. Si vous choisissez d'utiliser les Services et de créer un compte, vous êtes responsable de veiller à la sécurité des informations d'identification de votre compte. Nous vous recommandons fortement de ne pas partager votre nom d'utilisateur, votre mot de passe ou d'autres informations d'accès. Si vous pensez que votre compte a été compromis, veuillez nous contacter immédiatement. Si vous résidez dans l'EEE, le fondement juridique de ces activités de traitement de données réside dans notre intérêt légitime à assurer la sécurité de notre site web pour vous et les autres clients, conformément à l'art. 6 (1) (f) du RGPD.</li>
                  <li><strong>Communiquer avec vous et améliorer les Services.</strong> Nous utilisons vos informations personnelles pour vous fournir le service à la clientèle et améliorer nos Services. Ceci est dans notre intérêt légitime afin d'assurer notre réactivité, de vous fournir des services efficaces et de maintenir notre relation commerciale avec vous selon l'art. 6 (1) (f) du RGPD.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Cookies</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Comme de nombreux sites web, nous utilisons des cookies sur notre Site. Pour des informations précises sur les cookies que nous utilisons dans le cadre de l'exploitation de notre boutique avec Shopify, allez sur <a href="https://www.shopify.com/legal/cookies" target="_blank" rel="noreferrer noopener" className="text-blue-600 hover:text-blue-700 underline">https://www.shopify.com/legal/cookies</a>. Nous utilisons des cookies pour faire fonctionner et améliorer notre Site et nos Services (y compris pour mémoriser vos actions et préférences), pour réaliser des analyses et mieux comprendre l'interaction des utilisateurs avec les Services (dans notre intérêt légitime d'administrer, d'améliorer et d'optimiser les Services). Nous pouvons également autoriser des tiers et des prestataires de services à utiliser des cookies sur notre Site afin de mieux adapter les services, produits et publicités sur notre Site et d'autres sites web.
                </p>
                <p className="text-slate-700 leading-relaxed mb-4">
                  La plupart des navigateurs acceptent automatiquement les cookies par défaut, mais vous pouvez choisir de configurer votre navigateur pour qu'il supprime ou rejette les cookies grâce aux contrôles de votre navigateur. Veuillez garder à l'esprit que la suppression ou le blocage des cookies peut nuire à votre expérience utilisateur et entraîner un dysfonctionnement de certains Services, y compris certaines fonctionnalités et fonctionnalités générales, ou leur indisponibilité. De plus, le blocage des cookies peut ne pas empêcher complètement la manière dont nous partageons des informations avec des tiers tels que nos partenaires publicitaires.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Notre site web reconnaît également le signal de contrôle mondial de la confidentialité (<em>Global Privacy Control, </em>GPC), qui vous permet de refuser certaines utilisations ou divulgations de vos informations. Si vous nous informez de votre préférence via le signal GPC, nous traiterons ce signal comme une demande valide de refus du partage ou de la publicité ciblée pour le navigateur ou l'appareil associé et, si nous sommes en mesure d'associer l'appareil envoyant le signal à un compte Shopify, nous appliquerons également cette demande au compte. Pour en savoir plus sur le contrôle mondial de la confidentialité <em>Global Privacy Control</em>, vous pouvez aller sur <a href="https://globalprivacycontrol.org/" target="_blank" rel="noreferrer noopener" className="text-blue-600 hover:text-blue-700 underline">https://globalprivacycontrol.org/</a>. Outre le signal <em>Global Privacy Control</em>, nous ne reconnaissons pas d'autres signaux d'interdiction de suivi (« Do No Track ») pouvant être envoyés depuis votre navigateur web ou votre appareil.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Comment nous divulguons les informations personnelles</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Dans certaines circonstances, nous pouvons divulguer vos informations personnelles à des tiers à des fins d'exécution de contrat, à des fins légitimes et pour d'autres raisons soumises à la présente politique de confidentialité. Il peut s'agir notamment :
                </p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700">
                  <li>De fournisseurs ou d'autres tiers qui accomplissent des services en notre nom (p. ex. gestion informatique, traitement des paiements, analyse de données, service à la clientèle, stockage sur le cloud, traitement des commandes et expédition).</li>
                  <li>Des partenaires commerciaux et marketing pour vous fournir des services et vous adresser de la publicité. Nos partenaires commerciaux et marketing utiliseront vos informations conformément à leurs propres avis de confidentialité.</li>
                  <li>Lorsque vous nous demandez de divulguer ou consentez de toute autre manière à ce que nous divulguions certaines informations à des tiers, par exemple pour vous expédier des produits ou via votre utilisation de widgets de médias sociaux ou d'intégrations d'identifiants, avec votre consentement.</li>
                  <li>Avec nos affiliés ou au sein de notre groupe d'entreprises, dans notre intérêt légitime de gérer une entreprise prospère.</li>
                  <li>Dans le cadre d'une transaction commerciale comme une fusion ou une faillite, pour se conformer aux obligations légales applicables (y compris pour répondre aux assignations à comparaître, aux mandats de perquisition et aux demandes similaires), pour faire respecter les conditions de service applicables et pour protéger ou défendre les Services, nos droits et les droits de nos utilisateurs ou de tiers.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Sites web et Liens tiers</h2>
                <p className="text-slate-700 leading-relaxed">
                  Notre Site peut fournir des liens vers des sites web ou d'autres plateformes en ligne exploitées par des tiers. Si vous suivez des liens vers des sites non affiliés ou que nous ne contrôlons pas, vous devez consulter leurs politiques de confidentialité et de sécurité ainsi que leurs autres conditions générales d'utilisation. Nous ne garantissons pas et ne sommes pas responsables de la confidentialité ou de la sécurité de ces sites, y compris de l'exactitude, de l'exhaustivité ou de la fiabilité des informations trouvées sur ces sites. Les informations que vous fournissez sur des zones publiques ou semi-publiques, y compris les informations que vous partagez sur des plateformes de réseaux sociaux tierces, peuvent également être visibles par d'autres utilisateurs des Services et/ou par les utilisateurs desdites plateformes tierces, sans que l'utilisation que nous en faisons ou qu'en fait un tiers ne soit limitée. Le fait que nous incluons ce type de liens n'implique pas, en soi, une approbation du contenu desdites plateformes ou de leurs propriétaires ou opérateurs, sauf dans les situations énoncées dans les Services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Données sur les enfants</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Les Services ne sont pas destinés à être utilisés par des enfants, et nous ne collectons sciemment aucune information personnelle sur des enfants. Si vous êtes le parent ou le tuteur d'un enfant qui nous a fourni ses informations personnelles, vous pouvez nous contacter en utilisant les coordonnées indiquées ci-dessous pour demander leur suppression.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  À la date d'effet de la présente politique de confidentialité, nous ne savons pas réellement que nous « partageons » ou « vendons » (selon la définition attribuée à ces termes dans la législation en vigueur) les informations personnelles de personnes de moins de 16 ans.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Sécurité et conservation de vos informations</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Sachez qu'aucune mesure de sécurité n'est parfaite ou inviolable et que nous ne pouvons pas garantir une « sécurité absolue ». De plus, toutes les informations que vous nous envoyez sont susceptibles de ne pas être sécurisées pendant leur transit. Nous vous recommandons de ne pas utiliser de canaux non sécurisés pour nous communiquer des informations sensibles ou confidentielles.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  La durée de conservation de vos informations personnelles dépend de différents facteurs, par exemple si nous avons besoin ou pas de ces informations pour tenir votre compte, fournir les Services, respecter les obligations légales, résoudre des litiges ou faire appliquer d'autres contrats et politiques en vigueur.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Vos droits</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Selon votre lieu de résidence, vous pouvez bénéficier de la totalité ou d'une partie des droits énumérés ci-dessous en lien avec vos informations personnelles. Toutefois, ces droits ne sont pas absolus et ne peuvent s'appliquer que dans certaines circonstances, et nous pouvons dans certains cas refuser votre demande comme le permet la loi.
                </p>
                <ul className="list-disc pl-6 space-y-3 text-slate-700">
                  <li><strong>Droit d'accès/de savoir</strong> : Vous pouvez avoir le droit de demander l'accès aux informations personnelles que nous détenons à votre sujet, y compris les détails relatifs à la manière dont nous utilisons et partageons vos informations.</li>
                  <li><strong>Droit de suppression</strong> : Vous pouvez avoir le droit de demander que nous supprimions les informations personnelles que nous conservons à votre sujet.</li>
                  <li><strong>Droit de correction</strong> : Vous pouvez avoir le droit de demander que nous corrigions les informations personnelles que nous conservons à votre sujet.</li>
                  <li><strong>Droit de portabilité</strong> : Vous pouvez avoir le droit de recevoir une copie des informations personnelles que nous détenons à votre sujet et de demander que nous les transférions à un tiers, dans certaines circonstances et avec certaines exceptions.</li>
                  <li><strong>Droit de refuser la vente, le partage ou la publicité ciblée</strong> : Vous pouvez avoir le droit de nous demander de ne pas « vendre » ou « partager » vos informations personnelles ou de refuser le traitement de vos informations personnelles à des fins considérées comme de la « publicité ciblée », tel que défini dans les lois relatives à la confidentialité.</li>
                  <li><strong>Restriction du traitement</strong> : Vous pouvez avoir le droit de nous demander d'arrêter ou de restreindre notre traitement des informations personnelles.</li>
                  <li><strong>Consentement du retrait</strong> : Lorsque nous nous fondons sur votre consentement pour traiter vos informations personnelles, vous pouvez avoir le droit de retirer ledit consentement.</li>
                  <li><strong>Appel</strong> : Vous pouvez avoir le droit de faire appel de notre décision si nous refusons de traiter votre demande.</li>
                  <li><strong>Gestion des préférences de communication</strong> : Nous pouvons vous envoyer des e-mails promotionnels que vous pouvez refuser de recevoir à tout moment en utilisant l'option de désabonnement affichée dans nos e-mails.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Réclamations</h2>
                <p className="text-slate-700 leading-relaxed">
                  Si vous avez des réclamations à émettre concernant la façon dont nous traitons vos informations personnelles, veuillez nous contacter à l'aide des coordonnées fournies ci-dessous. Si notre réponse à votre réclamation ne vous satisfait pas, en fonction de votre lieu de résidence, vous pouvez avoir le droit de faire appel de notre décision en nous contactant à l'aide des coordonnées indiquées ci-dessous, ou de déposer votre réclamation auprès de votre autorité locale en matière de protection des données.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Utilisateurs internationaux</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Veuillez noter que nous pouvons transférer, stocker et traiter vos informations personnelles en dehors du pays dans lequel vous vivez. Vos informations personnelles sont également traitées par les employés et par des prestataires de services et partenaires tiers dans ces pays.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Si nous transférons vos informations personnelles hors d'Europe, nous aurons recours à des mécanismes de transfert reconnus comme les clauses contractuelles types de la Commission européenne ou tout contrat équivalent émis par l'autorité compétente du Royaume-Uni, selon le cas, sauf si le transfert de données s'effectue vers un pays réputé fournir un niveau de protection adéquat.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-slate-800 mb-4">Contact</h2>
                <p className="text-slate-700 leading-relaxed mb-4">
                  Si vous avez des questions sur nos pratiques en matière de confidentialité ou cette politique de confidentialité, ou si vous souhaitez exercer l'un des droits dont vous disposez, veuillez nous appeler ou nous envoyer un e-mail à l'adresse <a href="mailto:shoplittlehero069@gmail.com" className="text-blue-600 hover:text-blue-700 underline">shoplittlehero069@gmail.com</a> ou nous contacter au 8 rue du Cdt René Mouchotte, Paris, 75014, FR.
                </p>
                <p className="text-slate-700 leading-relaxed">
                  Aux fins des lois applicables sur la protection des données et sauf indication contraire explicite, nous sommes le responsable du traitement de vos informations personnelles.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
