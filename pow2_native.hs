{-# LANGUAGE RankNTypes #-}

import System.Environment

data Tree = Bin Tree Tree | Tip

size :: Tree -> Int
size Tip       = 1
size (Bin a b) = size a + size b

pow2 :: Int -> Tree
pow2 0 = Tip
pow2 n = Bin (pow2 (n - 1)) (pow2 (n - 1))

main :: IO()
main = do
  args <- getArgs
  let depth = if length args < 1 then 0 else read (head args)
  print (size (pow2 depth))
