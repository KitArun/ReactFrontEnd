import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import ProductTable from "./ProductTable";

export default function FilterableProductTable({products, filterData, filterAction, inStockOnlyData, inStockOnlyAction}) {
    return (
        <div>
            <SearchBar
                filterText = {filterData}
                inStockOnly = {inStockOnlyData}
                onFilterTextChange = {filterAction}
                onInStockOnlyChange = {inStockOnlyAction}
            />
            <ProductTable
                products = {products}
                filterText = {filterData}
                inStockOnly = {inStockOnlyData}
            />
        </div>
    );
}

FilterableProductTable.PropTypes = {
    products: PropTypes.object.isRequired,
    filterData: PropTypes.string.isRequired,
    filterAction: PropTypes.func.isRequired,
    inStockOnlyData: PropTypes.bool.isRequired,
    inStockOnlyAction: PropTypes.func.isRequired,
};