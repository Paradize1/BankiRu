import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, MenuItem, Select } from '@mui/material';
import data from './mock.json';

function App() {
  const [filterAmount, setFilterAmount] = useState<number | string>('');
  const [sortOption, setSortOption] = useState<string>(''); 
  const [filteredProducts, setFilteredProducts] = useState(data.products);

  useEffect(() => {
    // Загружаем сохраненные данные из localStorage при первом рендере
    const savedData = localStorage.getItem('filteredProducts');
    if (savedData) {
      setFilteredProducts(JSON.parse(savedData));
    }
  }, []);

  // Обработка фильтра по сумме
  const handleFilter = () => {
    const filtered = data.products.filter((product) => product.amount >= Number(filterAmount));
    setFilteredProducts(filtered);
    // Сохраняем результат фильтрации в localStorage
    localStorage.setItem('filteredProducts', JSON.stringify(filtered));
  };

  // Обработка сортировки
  const handleSort = (option: string) => {
    let sortedProducts = [...filteredProducts];
    if (option === 'max') {
      sortedProducts.sort((a, b) => b.amount - a.amount);
    } else if (option === 'min') {
      sortedProducts.sort((a, b) => a.amount - b.amount);
    }
    setFilteredProducts(sortedProducts);
    setSortOption(option);
    // Сохраняем результат сортировки в localStorage
    localStorage.setItem('filteredProducts', JSON.stringify(sortedProducts));
  };

  return (
    <div className="App">
      <TextField
        label="Сумма кредита"
        variant="outlined"
        value={filterAmount}
        onChange={(e) => setFilterAmount(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      <Button variant="contained" color="primary" onClick={handleFilter}>
        Применить фильтр
      </Button>

      <Select
        value={sortOption}
        onChange={(e) => handleSort(e.target.value as string)}
        displayEmpty
        style={{ marginTop: '20px', marginBottom: '20px' }}
      >
        <MenuItem value="" disabled>Сортировать</MenuItem>
        <MenuItem value="max">По максимальной сумме</MenuItem>
        <MenuItem value="min">По минимальной сумме</MenuItem>
      </Select>

      <div className="product-list">
        {filteredProducts.map((product, index) => (
          <Card key={index} style={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {product.name}
              </Typography>
              <img src={product.logo} alt={product.name} style={{ width: '50px', height: '50px' }} />
              <Typography color="textSecondary">
                Сумма: {product.amount} ₽
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;