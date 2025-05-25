import app from "./app"; // ajuste o caminho conforme seu projeto
import { AppDataSource } from "./database/database";

const PORT = process.env.PORT || 3003;

(async () => {
  try {
    await AppDataSource.initialize();
    console.log(" Banco de dados conectado com sucesso");

    app.listen(PORT, () => {
      console.log(` Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error(" Erro ao conectar ao banco de dados:", error);
    process.exit(1); // Encerra a aplicação em caso de erro na conexão
  }
})();
