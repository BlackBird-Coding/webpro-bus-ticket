<script>
    // @ts-nocheck
      let login_selected = "อีเมล";
      let show_password = true
      let eye = ["",
        '<svg class="aspect-square h-6" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#9ca3af" d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73 16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0"/></svg>'
      ]
    
      function onChange(event) {
        login_selected = event.currentTarget.value;
      }
    
      $: type = show_password ? 'text' : 'password'
</script>
    <div>
      <div class="bg-blue-200 w-full h-screen fixed">
        <div class="flex flex-col items-center pt-5">
            <div class="text-4xl">สมัครสมาชิก</div>
        </div>
        <div class="flex justify-center text-xl mt-5">
            <div class="flex flex-col gap-5">
                <div class="flex gap-4 mt-5">
                    <input class="border-[1px] pl-2 py-1 rounded-sm border-gray-400" type="text" placeholder="ชื่อ">
                    <input class="border-[1px] pl-2 py-1 rounded-sm border-gray-400" type="text" placeholder="นามสกุล">
                </div>
                <div class="ml-1">
                    <h1>เพศ</h1>
                    <div class="ml-3 mt-2 flex gap-20">
                        <label class="flex items-center" for="ไม่ระบุ">
                            <input class="aspect-square w-4 mr-2" type="radio" name="sex" value="non">ไม่ระบุ
                        </label>
                        <label class="flex items-center" for="ชาย">
                            <input class="aspect-square w-4 mr-2" type="radio" name="sex" value="male">ชาย
                        </label>
                        <label class="flex items-center" for="หญิง">
                            <input class="aspect-square w-4 mr-2" type="radio" name="sex" value="female">หญิง
                        </label>
                    </div>
                </div>
                <div>
                    <h1>วันเกิด</h1>
                    <div class="mt-2 flex gap-5">
                        <select class="border-[1px] border-gray-400 rounded-sm py-1 pl-2 pr-12">
                            <option value="">วัน</option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>
                        <select class="border-[1px] border-gray-400 rounded-sm py-1 pl-2 pr-24">
                            <option value="">เดือน</option>
                            <option value="01">มกราคม</option>
                            <option value="02">กุมภาพันธ์</option>
                            <option value="03">มีนาคม</option>
                            <option value="04">เมษายน</option>
                            <option value="05">พฤษภาคม</option>
                            <option value="06">มิถุนายน</option>
                            <option value="07">กรกฎาคม</option>
                            <option value="08">สิงหาคม</option>
                            <option value="09">กันยายน</option>
                            <option value="10">ตุลาคม</option>
                            <option value="11">พฤศจิกายน</option>
                            <option value="12">ธันวาคม</option>
                        </select>
                        <select class="border-[1px] border-gray-400 rounded-sm py-1 pl-2 pr-12">
                            <option value="">ปี</option>
                            <option value="2024" > 2024</option>
                            <option value="2023" > 2023</option>
                            <option value="2022" > 2022</option>
                            <option value="2021" > 2021</option>
                            <option value="2020" > 2020</option>
                            <option value="2019" > 2019</option>
                            <option value="2018" > 2018</option>
                            <option value="2017" > 2017</option>
                            <option value="2016" > 2016</option>
                            <option value="2015" > 2015</option>
                            <option value="2014" > 2014</option>
                            <option value="2013" > 2013</option>
                            <option value="2012" > 2012</option>
                            <option value="2011" > 2011</option>
                            <option value="2010" > 2010</option>
                            <option value="2009" > 2009</option>
                            <option value="2008" > 2008</option>
                            <option value="2007" > 2007</option>
                            <option value="2006" > 2006</option>
                            <option value="2005" > 2005</option>
                            <option value="2004" > 2004</option>
                            <option value="2003" > 2003</option>
                            <option value="2002" > 2002</option>
                            <option value="2001" > 2001</option>
                            <option value="2000" > 2000</option>
                            <option value="1999" > 1999</option>
                            <option value="1998" > 1998</option>
                            <option value="1997" > 1997</option>
                            <option value="1996" > 1996</option>
                            <option value="1995" > 1995</option>
                            <option value="1994" > 1994</option>
                            <option value="1993" > 1993</option>
                            <option value="1992" > 1992</option>
                            <option value="1991" > 1991</option>
                            <option value="1990" > 1990</option>
                            <option value="1989" > 1989</option>
                            <option value="1988" > 1988</option>
                            <option value="1987" > 1987</option>
                            <option value="1986" > 1986</option>
                            <option value="1985" > 1985</option>
                            <option value="1984" > 1984</option>
                            <option value="1983" > 1983</option>
                            <option value="1982" > 1982</option>
                            <option value="1981" > 1981</option>
                            <option value="1980" > 1980</option>
                            <option value="1979" > 1979</option>
                            <option value="1978" > 1978</option>
                            <option value="1977" > 1977</option>
                            <option value="1976" > 1976</option>
                            <option value="1975" > 1975</option>
                            <option value="1974" > 1974</option>
                            <option value="1973" > 1973</option>
                            <option value="1972" > 1972</option>
                            <option value="1971" > 1971</option>
                            <option value="1970" > 1970</option>
                            <option value="1969" > 1969</option>
                            <option value="1968" > 1968</option>
                            <option value="1967" > 1967</option>
                            <option value="1966" > 1966</option>
                            <option value="1965" > 1965</option>
                            <option value="1964" > 1964</option>
                            <option value="1963" > 1963</option>
                            <option value="1962" > 1962</option>
                            <option value="1961" > 1961</option>
                            <option value="1960" > 1960</option>
                            <option value="1959" > 1959</option>
                            <option value="1958" > 1958</option>
                            <option value="1957" > 1957</option>
                            <option value="1956" > 1956</option>
                            <option value="1955" > 1955</option>
                            <option value="1954" > 1954</option>
                            <option value="1953" > 1953</option>
                            <option value="1952" > 1952</option>
                            <option value="1951" > 1951</option>
                            <option value="1950" > 1950</option>
                            <option value="1949" > 1949</option>
                            <option value="1948" > 1948</option>
                            <option value="1947" > 1947</option>
                            <option value="1946" > 1946</option>
                            <option value="1945" > 1945</option>
                            <option value="1944" > 1944</option>
                            <option value="1943" > 1943</option>
                            <option value="1942" > 1942</option>
                            <option value="1941" > 1941</option>
                            <option value="1940" > 1940</option>
                            <option value="1939" > 1939</option>
                            <option value="1938" > 1938</option>
                            <option value="1937" > 1937</option>
                            <option value="1936" > 1936</option>
                            <option value="1935" > 1935</option>
                            <option value="1934" > 1934</option>
                            <option value="1933" > 1933</option>
                            <option value="1932" > 1932</option>
                            <option value="1931" > 1931</option>
                            <option value="1930" > 1930</option>
                            <option value="1929" > 1929</option>
                            <option value="1928" > 1928</option>
                            <option value="1927" > 1927</option>
                            <option value="1926" > 1926</option>
                            <option value="1925" > 1925</option>
                        </select>
                    </div>
                </div>
                <hr class="bg-gray-400 border-0 h-[1px]">
                <div class="ml-3 mt-2 flex gap-20">
                    <label for="">
                        <input checked="true" type="radio" name="login" value="อีเมล" on:change={onChange}>อีเมล
                    </label>
                    <label for="">
                        <input type="radio" name="login" value="หมายเลขโทรศัพท์" on:change={onChange}>หมายเลขโทรศัพท์
                    </label>
                </div>
                <div>
                    <input class="w-full border-[1px] pl-2 py-1 rounded-sm border-gray-400" type="text" placeholder="ป้อน{login_selected}">
                </div>
                <div class="flex">
                    <input class="w-full border-[1px] border-r-0 rounded-r-none pl-2 py-1 rounded-sm border-gray-400" type="password" placeholder="รหัสผ่านใหม่">
                    <button class="bg-white rounded-sm rounded-l-none h-[37px] border-[1px] border-gray-400 border-l-0">{eye[0].value}</button>
                </div>
            </div>
        </div>
      </div>
    </div>