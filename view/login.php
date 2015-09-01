<div>
    <h2 class="large-offset-1">Login:</h2>
    <div class="large-offset-1 large-3">
        <form action="/internal/login.php" method="post">
            <div>
                <!--            <label class="label" for="user_roll">Roll</label>-->
                <input type="text" name="user[roll]" id="user_roll" placeholder="University Roll"/>
            </div>
            <div>
                <!--            <label class="label" for="user_password">Password</label>-->
                <input type="password" name="user[password]" id="user_password" placeholder="Password"/>
            </div>
            <div>
                <input type="submit" name="login" id="login_button" class="button" value="Login"/>
            </div>
        </form>
    </div>
</div>
