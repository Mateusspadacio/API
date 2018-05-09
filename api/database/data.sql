INSERT INTO `users` (`email`, `faceid`, `password`)
VALUES
	('mateus@gmail.com', 'mateus_renato', '40bd001563085fc35165329ea1ff5c5ecbdbbeef'),
	('otavio@gmail.com', 'otavio', '40bd001563085fc35165329ea1ff5c5ecbdbbeef'),
	('mateusanjos@gmail.com', 'mateus_anjo', '40bd001563085fc35165329ea1ff5c5ecbdbbeef');

/*SENHA: 123*/
INSERT INTO statistics(water, energy, month, year) VALUES(20, 80, 5, 2018);
INSERT INTO statistics(water, energy, month, year) VALUES(30, 55, 5, 2018);
INSERT INTO statistics(water, energy, month, year) VALUES(41, 80, 4, 2018);
INSERT INTO statistics(water, energy, month, year) VALUES(21, 540, 3, 2018);

INSERT INTO statistics(water, energy, month, year) VALUES(28, 200, 6, 2017);
INSERT INTO statistics(water, energy, month, year) VALUES(28, 200, 6, 2017);
INSERT INTO statistics(water, energy, month, year) VALUES(35, 158, 3, 2017);

/* PROCEDURES */
DELIMITER $
	CREATE PROCEDURE func_insert_statistics(vemail VARCHAR(200), venergia DOUBLE, vagua DOUBLE, vtempomusica INT, vtempotelevisao INT)
	BEGIN
		DECLARE viduser int;
		
		SELECT id INTO viduser FROM users WHERE email = vemail;
		
		INSERT INTO statistics(iduser, energia, agua, tempomusica, tempotelevisao) VALUES (viduser, venergia, vagua, vtempomusica, vtempotelevisao);
		
	END$
DELIMITER ;
