-- ProgressMate - Tietokantasuunnitelma ja konseptit
-- Kurssi: Hybridisovellukset
-- Tekijä: Ahmed Ezzaroui

-- 1. TRANSAKTIOT (Transactions)
-- Sovelluksessa käyttäjä lataa kuvia aikajanalle. On kriittistä, että 
-- tietokantamerkintä ja varsinainen tiedosto pysyvät synkassa.

-- TOTEUTUS:
-- Käytän transaktiota kuvan latauksen yhteydessä. Ensin teen INSERT tietokantaan, 
-- ja vasta jos tiedoston tallennus palvelimelle onnistuu, teen COMMIT. 
-- Jos tallennus epäonnistuu (esim. yhteysvirhe), teen ROLLBACK.

/* Esimerkki (pseudo-koodi):
START TRANSACTION;
INSERT INTO MediaItems (user_id, filename, title) VALUES (1, 'image.jpg', 'Gym Progress');
-- Jos tiedoston tallennus epäonnistuu -> ROLLBACK;
-- Jos onnistuu -> COMMIT;
*/

-- 2. NÄKYMÄT (Views)
-- Käyttäjän profiilisivulla näytetään yhteenveto: kuinka monta päivitystä 
-- hän on tehnyt ja paljonko tykkäyksiä hän on saanut yhteensä.

-- TOTEUTUS:
-- Luon UserStats-näkymän, joka laskee nämä valmiiksi. Backend-koodi pysyy siistinä, 
-- kun voin hakea tilastot yksinkertaisella kyselyllä.

/* Esimerkki:
CREATE VIEW UserStats AS
SELECT 
    Users.username, 
    COUNT(MediaItems.media_id) AS total_uploads
FROM Users
LEFT JOIN MediaItems ON Users.user_id = MediaItems.user_id
GROUP BY Users.user_id;
*/


-- 3. INDEKSIT (Indexes)
-- Sovelluksessa seurataan eri aiheita (esim. "Kuntosali" tai "Opiskelu"...), 
-- joten hakutoiminto tagien perusteella tulee olemaan kovassa käytössä.

-- TOTEUTUS:
-- Lisään indeksin Tags-taulun tag_name-sarakkeeseen nopeuttamaan hakuja.

/* Esimerkki:
CREATE INDEX idx_tag_name ON Tags(tag_name);
*/
