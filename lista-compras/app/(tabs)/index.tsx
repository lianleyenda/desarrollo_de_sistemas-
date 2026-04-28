import AgregarItemDeComprar from "@/components/ui/lista_de_compras/Agregar_Item_De_Comprar";
import Contenedor from "@/components/ui/lista_de_compras/contenedor";
import ListaDeCompras from "@/components/ui/lista_de_compras/Lista_De_Compras";
import TituloDeLaPagina from "@/components/ui/lista_de_compras/Titulo_De_La_Pagina";
import { useListaDeCompras } from "@/hooks/useListaDeCompras";

export default function PantallaPrincipal() {
  const hook = useListaDeCompras();
  return (
    <Contenedor>
      <TituloDeLaPagina />
      <AgregarItemDeComprar text={hook.text} setText={hook.setText} agregarItem={hook.agregarItem} />
      <ListaDeCompras items={hook.items} marcarItem={hook.marcarItem} removerItem={hook.removerItem} />
    </Contenedor>
  );
}