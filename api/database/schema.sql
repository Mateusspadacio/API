CREATE DATABASE IF NOT EXISTS `rh_eletronico` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `cliente1_db`;

-- --------------------------------------------------------

--
-- Estrutura para tabela `atuador_bdagua`
--

CREATE TABLE `atuador_bdagua` (
  `id` int(11) NOT NULL,
  `datahora` datetime NOT NULL DEFAULT current_timestamp(),
  `motivo` varchar(255) NOT NULL,
  `fk_id_comodo` int(11) DEFAULT NULL,
  `fk_id_funcionario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `atuador_fechadura`
--

CREATE TABLE `atuador_fechadura` (
  `id` int(11) NOT NULL,
  `datahora` datetime NOT NULL DEFAULT current_timestamp(),
  `motivo` varchar(255) NOT NULL,
  `fk_id_comodo` int(11) DEFAULT NULL,
  `fk_id_funcionario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `atuador_luz`
--

CREATE TABLE `atuador_luz` (
  `id` int(11) NOT NULL,
  `datahora` datetime NOT NULL DEFAULT current_timestamp(),
  `motivo` varchar(255) NOT NULL,
  `fk_id_comodo` int(11) DEFAULT NULL,
  `fk_id_funcionario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `atuador_valvula`
--

CREATE TABLE `atuador_valvula` (
  `id` int(11) NOT NULL,
  `datahora` datetime NOT NULL DEFAULT current_timestamp(),
  `motivo` varchar(255) NOT NULL,
  `fk_id_comodo` int(11) DEFAULT NULL,
  `fk_id_funcionario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `comodo`
--

CREATE TABLE `comodo` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `empresa`
--

CREATE TABLE `empresa` (
  `pol_ambiente` varchar(255) DEFAULT NULL,
  `pol_qualidade` varchar(255) DEFAULT NULL,
  `certificacoes` varchar(255) DEFAULT NULL,
  `crescimento` float DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `plr` decimal(15,2) DEFAULT NULL,
  `cnpj` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `funcionario`
--

CREATE TABLE `funcionario` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `cargo` varchar(255) NOT NULL,
  `rg` varchar(255) NOT NULL,
  `cpf` varchar(255) NOT NULL,
  `salariohora` decimal(15,2) NOT NULL,
  `horaextra` decimal(4,2) DEFAULT NULL,
  `bancohoras` decimal(4,2) DEFAULT NULL,
  `exameperiodico` date DEFAULT NULL,
  `beneficios` varchar(255) DEFAULT NULL,
  `datainicio` date DEFAULT NULL,
  `datareajuste` date DEFAULT NULL,
  `dataferias` date DEFAULT NULL,
  `dataholerite` date DEFAULT NULL,
  `cipa` tinyint(1) NOT NULL DEFAULT 0,
  `b_incendio` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `indicacoes`
--

CREATE TABLE `indicacoes` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `data` date NOT NULL DEFAULT current_timestamp(),
  `funcao` varchar(255) DEFAULT NULL,
  `telefone` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `fk_id_funcionario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `insc_b_incendio`
--

CREATE TABLE `insc_b_incendio` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `data` date NOT NULL DEFAULT current_timestamp(),
  `fk_id_funcionario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `insc_cipa`
--

CREATE TABLE `insc_cipa` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `data` date NOT NULL DEFAULT current_timestamp(),
  `fk_id_funcionario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `sensor_agua`
--

CREATE TABLE `sensor_agua` (
  `id` int(11) NOT NULL,
  `datahora` datetime NOT NULL DEFAULT current_timestamp(),
  `leitura` float NOT NULL,
  `fk_id_comodo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura para tabela `sensor_eletricidade`
--

CREATE TABLE `sensor_eletricidade` (
  `id` int(11) NOT NULL,
  `datahora` datetime NOT NULL DEFAULT current_timestamp(),
  `leitura` float NOT NULL,
  `fk_id_comodo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `beneficio` (
  `id` int(3) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `descricao` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices de tabelas apagadas
--

--
-- Índices de tabela `atuador_bdagua`
--
ALTER TABLE `atuador_bdagua`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_comodo` (`fk_id_comodo`),
  ADD KEY `fk_id_funcionario` (`fk_id_funcionario`);

--
-- Índices de tabela `atuador_fechadura`
--
ALTER TABLE `atuador_fechadura`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_comodo` (`fk_id_comodo`),
  ADD KEY `fk_id_funcionario` (`fk_id_funcionario`);

--
-- Índices de tabela `atuador_luz`
--
ALTER TABLE `atuador_luz`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_comodo` (`fk_id_comodo`,`fk_id_funcionario`),
  ADD KEY `fk_id_funcionario` (`fk_id_funcionario`);

--
-- Índices de tabela `atuador_valvula`
--
ALTER TABLE `atuador_valvula`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_comodo` (`fk_id_comodo`),
  ADD KEY `fk_id_funcionario` (`fk_id_funcionario`);

--
-- Índices de tabela `comodo`
--
ALTER TABLE `comodo`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `funcionario`
--
ALTER TABLE `funcionario`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `indicacoes`
--
ALTER TABLE `indicacoes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_usuario` (`fk_id_funcionario`);

--
-- Índices de tabela `insc_b_incendio`
--
ALTER TABLE `insc_b_incendio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_funcionario` (`fk_id_funcionario`);

--
-- Índices de tabela `insc_cipa`
--
ALTER TABLE `insc_cipa`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_funcionario` (`fk_id_funcionario`);

--
-- Índices de tabela `sensor_agua`
--
ALTER TABLE `sensor_agua`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_comodo` (`fk_id_comodo`);

--
-- Índices de tabela `sensor_eletricidade`
--
ALTER TABLE `sensor_eletricidade`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_id_comodo` (`fk_id_comodo`);

--
-- AUTO_INCREMENT de tabelas apagadas
--

--
-- AUTO_INCREMENT de tabela `atuador_bdagua`
--
ALTER TABLE `atuador_bdagua`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `atuador_fechadura`
--
ALTER TABLE `atuador_fechadura`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `atuador_luz`
--
ALTER TABLE `atuador_luz`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `atuador_valvula`
--
ALTER TABLE `atuador_valvula`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `comodo`
--
ALTER TABLE `comodo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `funcionario`
--
ALTER TABLE `funcionario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `indicacoes`
--
ALTER TABLE `indicacoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `insc_b_incendio`
--
ALTER TABLE `insc_b_incendio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `insc_cipa`
--
ALTER TABLE `insc_cipa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `sensor_agua`
--
ALTER TABLE `sensor_agua`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `sensor_eletricidade`
--
ALTER TABLE `sensor_eletricidade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restrições para dumps de tabelas
--

--
-- Restrições para tabelas `atuador_bdagua`
--
ALTER TABLE `atuador_bdagua`
  ADD CONSTRAINT `atuador_bdagua_ibfk_1` FOREIGN KEY (`fk_id_funcionario`) REFERENCES `funcionario` (`id`),
  ADD CONSTRAINT `atuador_bdagua_ibfk_2` FOREIGN KEY (`fk_id_comodo`) REFERENCES `comodo` (`id`);

--
-- Restrições para tabelas `atuador_fechadura`
--
ALTER TABLE `atuador_fechadura`
  ADD CONSTRAINT `atuador_fechadura_ibfk_1` FOREIGN KEY (`fk_id_funcionario`) REFERENCES `funcionario` (`id`),
  ADD CONSTRAINT `atuador_fechadura_ibfk_2` FOREIGN KEY (`fk_id_comodo`) REFERENCES `comodo` (`id`);

--
-- Restrições para tabelas `atuador_luz`
--
ALTER TABLE `atuador_luz`
  ADD CONSTRAINT `atuador_luz_ibfk_1` FOREIGN KEY (`fk_id_comodo`) REFERENCES `comodo` (`id`),
  ADD CONSTRAINT `atuador_luz_ibfk_2` FOREIGN KEY (`fk_id_funcionario`) REFERENCES `funcionario` (`id`);

--
-- Restrições para tabelas `atuador_valvula`
--
ALTER TABLE `atuador_valvula`
  ADD CONSTRAINT `atuador_valvula_ibfk_1` FOREIGN KEY (`fk_id_funcionario`) REFERENCES `funcionario` (`id`),
  ADD CONSTRAINT `atuador_valvula_ibfk_2` FOREIGN KEY (`fk_id_comodo`) REFERENCES `comodo` (`id`);

--
-- Restrições para tabelas `indicacoes`
--
ALTER TABLE `indicacoes`
  ADD CONSTRAINT `indicacoes_ibfk_1` FOREIGN KEY (`fk_id_funcionario`) REFERENCES `funcionario` (`id`);

--
-- Restrições para tabelas `insc_b_incendio`
--
ALTER TABLE `insc_b_incendio`
  ADD CONSTRAINT `insc_b_incendio_ibfk_1` FOREIGN KEY (`fk_id_funcionario`) REFERENCES `funcionario` (`id`);

--
-- Restrições para tabelas `insc_cipa`
--
ALTER TABLE `insc_cipa`
  ADD CONSTRAINT `insc_cipa_ibfk_1` FOREIGN KEY (`fk_id_funcionario`) REFERENCES `funcionario` (`id`);

--
-- Restrições para tabelas `sensor_agua`
--
ALTER TABLE `sensor_agua`
  ADD CONSTRAINT `sensor_agua_ibfk_1` FOREIGN KEY (`fk_id_comodo`) REFERENCES `comodo` (`id`);

--
-- Restrições para tabelas `sensor_eletricidade`
--
ALTER TABLE `sensor_eletricidade`
  ADD CONSTRAINT `sensor_eletricidade_ibfk_1` FOREIGN KEY (`fk_id_comodo`) REFERENCES `comodo` (`id`);
COMMIT;



-- fake data

INSERT INTO `beneficio`(descricao) VALUES("Vale Alimentação");
INSERT INTO `beneficio`(descricao) VALUES("Vale Transporte");
INSERT INTO `beneficio`(descricao) VALUES("Odontologico");

